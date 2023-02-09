from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.connection import get_db
from schemas.models import DeletePostResponse, UserCart, UpdatePost
from utils.cart_crud import (
    cart_get_all,
    cart_item_create,
    cart_item_delete
)

router = APIRouter(tags=["cart"])


@router.post("/add", status_code=status.HTTP_201_CREATED, response_model=UserCart)
def add_cart_item(item: UserCart, db: Session = Depends(get_db)):
    return cart_item_create(db=db, item=item)


@router.post("/get", status_code=status.HTTP_200_OK, response_model=List[UserCart])
def add_cart_item(email: str, db: Session = Depends(get_db)):
    return cart_get_all(db=db, email=email)


@router.delete(
    "/delete/{id}", status_code=status.HTTP_200_OK, response_model=DeletePostResponse
)
def delete_post(id, db: Session = Depends(get_db)):
    delete_status = cart_item_delete(db=db, id=id)
    if delete_status.detail == "Item does not exist":
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Item does not exist"
        )
    else:
        return delete_status
