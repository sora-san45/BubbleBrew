from sqlalchemy import Column, String, Integer, ForeignKey, Enum, Float, DateTime, Table
from database import Base
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import enum
import datetime
import uuid

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4,index=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    email=Column(String(100),nullable=False)
    password=Column(String(50),nullable=False)
    phone_no=Column(String(10),nullable=False)
    address=Column(String(255),nullable=False)
    orders = relationship("Order", back_populates="user")
    
class FlavourEnum(str,enum.Enum):
    chocolate = "Chocolate"
    macha = "Macha"
    strawberry = "Strawberry"
    mango = "Mango"
    blueberry = "Blueberry"
    classic = "Classic"

class FlavourColorEnum(str,enum.Enum):
    chocolate_color = "bg-yellow-950"
    macha_color = "bg-emerald-200"
    strawberry_color = "bg-pink-200"
    mango_color = "bg-yellow-200"
    blueberry_color = "bg-violet-200"
    classic_color = "bg-gray-200"

class ToppingEnum(str,enum.Enum):
    boba = "Boba"
    red_beans = "Red Beans"
    agar = "Agar"

class ToppingColorEnum(str,enum.Enum):
    boba_color = 'bg-black'
    red_beans_color = 'bg-red-950'
    agar_color = 'bg-gray-300'



class BubbleTea(Base):
    __tablename__ = "bubble_teas"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String(50), nullable=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    flavour = Column(Enum(FlavourEnum), nullable=False)
    flavour_color = Column(Enum(FlavourColorEnum), nullable=False)
    topping = Column(Enum(ToppingEnum), nullable=False)
    topping_color = Column(Enum(ToppingColorEnum), nullable=False)
    size = Column(String(1), nullable=False)
    price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)

class Cart(Base):
    __tablename__="carts"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    total_amount = Column(Float, nullable=False)
    items = relationship("BubbleTea", secondary="cart_items")
    
class CartItem(Base):
    __tablename__ = "cart_items"
    cart_id = Column(UUID(as_uuid=True), ForeignKey("carts.id"), primary_key=True)
    bubble_tea_id = Column(UUID(as_uuid=True), ForeignKey("bubble_teas.id"), primary_key=True)


class Order(Base):
    __tablename__ = "orders"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    order_status = Column(String(50), nullable=False)
    address=Column(String(255))
    total_amount = Column(Float)
    user = relationship("User", back_populates="orders")
    
class OrderItem(Base):
    __tablename__ = "order_items"
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"), primary_key=True)
    bubble_tea_id = Column(UUID(as_uuid=True), ForeignKey("bubble_teas.id"), primary_key=True)
    