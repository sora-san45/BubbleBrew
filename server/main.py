from typing import List
from uuid import UUID, uuid4
from fastapi import FastAPI
from models import Gender, Role, User

app = FastAPI()

db:List[User]=[
    User(
        id=UUID("d4526289-bef5-4a94-8931-5f8cb54e7d32"),
        first_name="jamila",
        last_name="ahmed",
        gender=Gender.female,
        role=[Role.student]
    ),
    User(
        id=UUID("79bc38da-868e-4a35-8eb9-9f4cc97458e9"),
        first_name="alex",
        last_name="jones",
        gender=Gender.female,
        role=[Role.admin,Role.user]
    )
]

@app.get("/")
async def root():
    return {"message": "Hello "}

@app.get("/api/v1/users")
async def fetch_users():
    return db

@app.post("/api/v1/users")
async def register_user(user: User):
    db.append(user)
    return {"id":user.id}

@app.delete("/api/v1/users/{user_id}")
async def delete_user(user_id:UUID):
    for user in db:
        if user.id==user_id:
            db.remove(user)
            return