import datetime
from typing import List, Optional
from uuid import UUID, uuid4
from pydantic import BaseModel, Field
from enum import Enum


    
class UserSchema(BaseModel):
    id: UUID
    first_name: str
    last_name: str
    email: str
    password:str
    phone_no: str
    address: str
    class Config:
        orm_mode = True

class UserLoginSchema(BaseModel):
    email: str
    password: str

class TokenSchema(BaseModel):
    access_token: str
    token_type: str
    user_id: UUID
    address: str
    user_name:str
    email:str
    class Config:
        orm_mode = True

class Flavour(str,Enum):
    chocolate="Chocolate"
    macha="Macha"
    strawberry="Strawberry"
    mango="Mango"
    blueberry="Blueberry"
    classic="Classic"

class FlavourColor(str,Enum):
    chocolate_color="bg-yellow-950"
    macha_color="bg-emerald-200"
    strawberry_color="bg-pink-200"
    mango_color="bg-yellow-200"
    blueberry_color="bg-violet-200"
    classic_color="bg-gray-200"
    
class ToppingColor(str,Enum):
    boba_color='bg-black'
    red_beans_color='bg-red-950'
    agar_color='bg-gray-300'

class Toppings(str,Enum):
    boba="Boba"
    red_beans="Red Beans"
    agar="Agar"
    

    
class BubbleTeaSchema(BaseModel):
    id: UUID = Field(default_factory=uuid4, alias="id")
    name:str
    user_id:UUID
    flavour:Flavour
    flavour_color:FlavourColor
    topping:Toppings
    topping_color:ToppingColor
    size:str
    price:float
    quantity:int
    class Config:
        orm_mode = True
        from_attributes=True

class CartSchema(BaseModel):
    id: UUID = Field(default_factory=uuid4, alias="id")
    user_id:UUID
    items:List[BubbleTeaSchema]
    total_amount:float
    class Config:
        orm_mode = True



class OrderSchema(BaseModel):
    id: UUID = Field(default_factory=uuid4, alias="id")
    user_id: UUID
    order_status: str
    address: str
    total_amount: Optional[float] = Field(default=0.0) 
    class Config:
        orm_mode = True
        from_attributes=True

    
class OrderBubbleTeaResponse(BaseModel):
    order: OrderSchema
    bubble_teas: List[BubbleTeaSchema]
    class Config:
        orm_mode = True
        from_attributes=True
