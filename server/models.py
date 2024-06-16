from typing import List, Optional
from uuid import UUID, uuid4
from pydantic import BaseModel
from enum import Enum


class Role(str,Enum):
    admin="admin"
    user="user"
    
class User(BaseModel):
    id:Optional[UUID]=uuid4()
    first_name:str
    middle_name:Optional[str]
    last_name:str
    role:List[Role]

class Flavour(str,Enum):
    chocolate="Chocolate"
    macha="Macha"
    strawberry="Strawberry"
    blueberry="Blueberry"
    classic="Classic"
    
class Toppings(str,Enum):
    boba="Boba"
    red_beans="Red Beans"
    agar="Agar"
    
class Size(str,Enum):
    small="S"
    medium="M"
    large="L"
    
class CartBubbleTea(BaseModel):
    id:Optional[UUID]=uuid4()
    name:Optional[str]
    flavour:Flavour
    agar:Toppings
    quantity:int
    size:Size
    
    