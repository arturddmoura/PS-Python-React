from typing import Optional
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str


class Product(BaseModel):
    id: Optional[UUID]
    name: str
    price: float
    score: int
    image: str

    class Config:
        orm_mode = True


class DeletePostResponse(BaseModel):
    detail: str


class UpdatePost(BaseModel):
    id: UUID
    title: str
    description: str

    class Config:
        orm_mode = True


class Users(BaseModel):
    id: Optional[UUID]
    name: str
    email: str
    password: str

    class Config:
        orm_mode = True


class UserCart(BaseModel):
    id: Optional[UUID]
    email: str
    name: str
    price: float
    image: str

    class Config:
        orm_mode = True


class Order(BaseModel):
    id: Optional[UUID]
    order_id: Optional[UUID]
    email: str
    name: str
    price: float
    image: str
    date: datetime

    class Config:
        orm_mode = True


class Login(BaseModel):
    email: str
    password: str

    class Config:
        orm_mode = True
