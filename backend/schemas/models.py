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
