from datetime import datetime, timedelta
from typing import Dict, List, Optional, Union
from uuid import UUID, uuid4
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI,Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db,SessionLocal
from app.models import BubbleTea, Cart, CartItem, Order, OrderItem, User
from app.schema import BubbleTeaSchema, OrderBubbleTeaResponse, OrderSchema, TokenSchema, UserLoginSchema, UserSchema
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt

SECRET_KEY = "maryannnoo"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI()

origins = [
    "http://localhost:5173",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

#auth stuffs






@app.post("/login", response_model=TokenSchema)
async def login_for_access_token(user_login: UserLoginSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_login.email).first()
    if not user or user.password != user_login.password:
        raise HTTPException(
            status_code=404,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
  
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"sub": user.email, "exp": datetime.utcnow() + access_token_expires}
    access_token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    
    return TokenSchema(access_token=access_token, token_type="bearer", user_id=user.id,address=user.address,user_name=user.first_name+" "+user.last_name,email=user.email)


@app.post("/signup",response_model=UserSchema)
def add_user(user_add:UserSchema,db:Session=Depends(get_db)):
    try:
        user=User(
        id=uuid4(),
        first_name=user_add.first_name,
        last_name=user_add.last_name,
        email=user_add.email,
        password=user_add.password,
        phone_no=user_add.phone_no,
        address=user_add.address)
        
        
    
        db.add(user)
        db.commit()
        db.refresh(user)
        
        return user
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500,detail=str(e))
    

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
    
@app.get("/cart_items/{userid}", response_model=dict[str, Union[List[BubbleTeaSchema], float]])
def get_cart_items(userid: UUID, db: Session = Depends(get_db)):
    try:
        cart_items_query = (
            db.query(BubbleTea)
            .join(CartItem, CartItem.bubble_tea_id == BubbleTea.id)
            .join(Cart, Cart.id == CartItem.cart_id)
            .filter(Cart.user_id == userid)
            .all()
        )
        
        cart_items = []
        total_amount = 0.0
        
        for bubble_tea in cart_items_query:
            cart_items.append(bubble_tea)
            total_amount += bubble_tea.price * bubble_tea.quantity

        return {"cart_items": cart_items, "total_amount": total_amount}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/delete_item/{userid}/{bubble_tea_id}")
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
    

@app.get("/orders/{userid}", response_model=List[OrderBubbleTeaResponse])
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