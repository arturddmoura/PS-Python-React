from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.connection import get_db
from schemas.models import DeletePostResponse, Order, UpdatePost
from utils.orders_crud import (
    orders_get_all,
    orders_get_order
)

router = APIRouter(tags=["orders"])


@router.post("/get/", status_code=status.HTTP_200_OK, response_model=List[Order])
def add_cart_item(email: str, db: Session = Depends(get_db)):
    return orders_get_all(db=db, email=email)


@router.post("/get/{order_id}", status_code=status.HTTP_200_OK, response_model=List[Order])
def get_single_order(order_id, db: Session = Depends(get_db)):
    return orders_get_order(db=db, order_id=order_id)
