from datetime import datetime
from typing import Dict, List
from uuid import UUID, uuid4
from fastapi import FastAPI,Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import BubbleTea, Cart, CartItem, Order, OrderItem, User
from schema import BubbleTeaSchema, OrderBubbleTeaResponse, OrderSchema, UserSchema

app = FastAPI()



@app.get("/users",response_model=List[UserSchema])
def get_all_users(db:Session=Depends(get_db)):
    users=db.query(User).all()
    return users

@app.post("/bubble_tea/", response_model=BubbleTeaSchema)
def add_bubbletea(bubble_tea: BubbleTeaSchema, db: Session = Depends(get_db)):
    try:
        bubble_tea_row = BubbleTea(
            name=bubble_tea.name,
            user_id=bubble_tea.user_id,
            flavour=bubble_tea.flavour,
            flavour_color=bubble_tea.flavour_color,
            topping=bubble_tea.topping,
            topping_color=bubble_tea.topping_color,
            size=bubble_tea.size,
            price=bubble_tea.price,
            quantity=bubble_tea.quantity
        )
        
        db.add(bubble_tea_row)
        db.commit()
        db.refresh(bubble_tea_row)
        
        user_cart = db.query(Cart).filter(Cart.user_id == bubble_tea.user_id).first()
        if not user_cart:
            user_cart = Cart(id=uuid4(), user_id=bubble_tea.user_id, total_amount=0)
            db.add(user_cart)
            db.commit()
            db.refresh(user_cart)
        cart_item = CartItem(cart_id=user_cart.id, bubble_tea_id=bubble_tea_row.id)
        db.add(cart_item)
        user_cart.total_amount += bubble_tea_row.price * bubble_tea_row.quantity
        db.commit()
        
        return bubble_tea_row
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/cart_items/",response_model=List[BubbleTeaSchema])
def get_cart_items(userid:UUID,db:Session=Depends(get_db)):
    try:
        cart_items = (
            db.query(BubbleTea)
            .join(CartItem, CartItem.bubble_tea_id == BubbleTea.id)
            .join(Cart, Cart.id == CartItem.cart_id)
            .filter(Cart.user_id == userid)
            .all()
        )
        
        return cart_items
    
    except Exception as e:
        raise HTTPException( status_code=500,detail=str(e))

@app.delete("/delete_item/")
def delete_cart_item(bubble_tea_id:UUID,userid:UUID,db:Session=Depends(get_db)):
    try:
        cart_item=db.query(CartItem).filter(CartItem.bubble_tea_id==bubble_tea_id).first()
        if not cart_item:
            raise HTTPException(status_code=404, detail=f"Bubble Tea item with id {bubble_tea_id} not found in the cart")
        bubble_tea = db.query(BubbleTea).filter(BubbleTea.id == bubble_tea_id).first()
        if not bubble_tea:
            raise HTTPException(status_code=404, detail=f"Bubble Tea item with id {bubble_tea_id} not found")
        
        user_cart = db.query(Cart).filter(Cart.user_id == userid).first()
        if not user_cart:
            raise HTTPException(status_code=404, detail="User's cart not found")
        
        user_cart.total_amount -= bubble_tea.price * bubble_tea.quantity
        db.commit()

        db.delete(cart_item)
        db.commit()

        db.delete(bubble_tea)
        db.commit()
        db.refresh(user_cart)
        
        return {"message": f"Bubble Tea item with id {bubble_tea_id} deleted successfully"}
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500,detail=str(e))
    
@app.put("/cart/{bubble_tea_id}",response_model=BubbleTeaSchema)
def modify_quanity(bubble_tea_id:UUID, quantity: int, db: Session = Depends(get_db)):
    try:
        bubble_tea = db.query(BubbleTea).filter(BubbleTea.id == bubble_tea_id).first()

        if not bubble_tea:
            raise HTTPException(status_code=404, detail="Bubble Tea item not found in the cart")
        
        og_quantity=bubble_tea.quantity
        price=bubble_tea.price
        

        bubble_tea.quantity = quantity
        cart_item = db.query(CartItem).filter(CartItem.bubble_tea_id == bubble_tea_id).first()
        cart_obj=db.query(Cart).filter(Cart.id==cart_item.cart_id).first()
        cart_obj.total_amount=cart_obj.total_amount+price*(quantity-og_quantity)
            
        db.commit()
        db.refresh(cart_obj)
        
        db.commit()
        db.refresh(bubble_tea)

        updated_bubble_tea = db.query(BubbleTea).filter(BubbleTea.id == bubble_tea_id).first()
        if not updated_bubble_tea:
            raise HTTPException(status_code=404, detail="Bubble Tea details not found")
        return updated_bubble_tea

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/orders", response_model=OrderSchema)
def add_order(order_items: OrderSchema, db: Session = Depends(get_db)):
    try:

        user_cart = db.query(Cart).filter(Cart.user_id == order_items.user_id).first()
        if not user_cart or not user_cart.items:
            raise HTTPException(status_code=404, detail="Cart is empty or not found")
        

        order_row = Order(
            id=uuid4(),
            user_id=order_items.user_id,
            order_status=order_items.order_status,
            address=order_items.address,
            total_amount=0
        )
        db.add(order_row)
        db.commit()
        db.refresh(order_row)

        total_amount = 0
        

        for item in user_cart.items:
            order_item = OrderItem(
                order_id=order_row.id,
                bubble_tea_id=item.id
            )
            db.add(order_item)
            total_amount += item.price * item.quantity
        

        order_row.total_amount = total_amount
        db.commit()
        db.refresh(order_row)
        
        db.query(CartItem).filter(CartItem.cart_id == user_cart.id).delete()
        user_cart.total_amount = 0
        db.commit()
        
        return order_row
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/orders", response_model=List[OrderBubbleTeaResponse])
def get_orders(userid: UUID, db: Session = Depends(get_db)):
    try:
        orders = db.query(Order).filter(Order.user_id == userid).all()
        
        if not orders:
            raise HTTPException(status_code=404, detail="No orders found for the given user")

        order_responses = []

        for order in orders:
            bubble_teas = (
                db.query(BubbleTea)
                .join(OrderItem, OrderItem.bubble_tea_id == BubbleTea.id)
                .filter(OrderItem.order_id == order.id)
                .all()
            )
            order_responses.append(OrderBubbleTeaResponse(order=OrderSchema.from_orm(order), bubble_teas=[BubbleTeaSchema.from_orm(bt) for bt in bubble_teas]))
        
        return order_responses
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))