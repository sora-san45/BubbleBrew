from typing import List, Optional
from uuid import UUID, uuid4
from pydantic import BaseModel
from enum import Enum

class Gender(str,Enum):
    male="male"
    female="female"

class Role(str,Enum):
    admin="admin"
    user="user"
    student="student"
    
class User(BaseModel):
    id:Optional[UUID]=uuid4()
    first_name:str
    middle_name:Optional[str]
    last_name:str
    gender:Gender
    role:List[Role]

class Flavour(str,Enum):
    chocolate="Chocolate"
    macha="Macha"
    strawberry="Strawberry"
    blueberry="Blueberry"
    classic="Classic"
    
class BubbleTea(BaseModel):
    id:Optional[UUID]=uuid4()
    name:Optional[str]
    flavour:Flavour
    
    