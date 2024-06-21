import datetime
from typing import List, Optional
from uuid import UUID, uuid4
from pydantic import BaseModel, Field
from enum import Enum


    
class User(BaseModel):
    id: UUID = Field(default_factory=uuid4, alias="id")
    first_name:str
    middle_name:Optional[str]
    last_name:str
    email:str
    password:str
    phone_no:str

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
    
class Size(str,Enum):
    small="S"
    medium="M"
    large="L"
    
class BubbleTea(BaseModel):
    id: UUID = Field(default_factory=uuid4, alias="id")
    name:Optional[str]
    flavour:List[Flavour]
    flavourColor:List[FlavourColor]
    topping:List[Toppings]
    toppingColor:List[ToppingColor]
    size:List[Size]
    price:float
    quantity:int

class Cart(BaseModel):
    id: UUID = Field(default_factory=uuid4, alias="id")
    user_id:User.id
    items:List[BubbleTea]
    total_amount:float


class Order(BaseModel):
    id: UUID = Field(default_factory=uuid4, alias="id")
    user_id: UUID
    cart_id: UUID
    order_status: str
    created_at: datetime.datetime
    address: str
    