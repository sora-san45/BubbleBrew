from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

URL_DATABASE="postgresql://bubbleteashop_owner:4goZzsrLa3PF@ep-plain-frost-a19bopny.ap-southeast-1.aws.neon.tech/bubbleteashop?sslmode=require"
engine=create_engine(URL_DATABASE)
SessionLocal=sessionmaker(autocommit=False,autoflush=False,bind=engine)

Base=declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()