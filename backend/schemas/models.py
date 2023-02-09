from typing import Optional
from uuid import UUID

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


class Login(BaseModel):
    email: str
    password: str

    class Config:
        orm_mode = True
