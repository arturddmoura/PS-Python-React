from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.connection import get_db
from schemas.models import DeletePostResponse, Product, UpdatePost
from utils.products_crud import (
    products_get_by_name,
    products_get_by_price,
    products_get_by_score
)

router = APIRouter(tags=["products"])


@router.get("/list/name", status_code=status.HTTP_200_OK, response_model=List[Product])
def get_products_by_name(db: Session = Depends(get_db)):
    return products_get_by_name(db=db)


@router.get("/list/price", status_code=status.HTTP_200_OK, response_model=List[Product])
def get_products_by_price(db: Session = Depends(get_db)):
    return products_get_by_price(db=db)


@router.get("/list/score", status_code=status.HTTP_200_OK, response_model=List[Product])
def get_products_by_score(db: Session = Depends(get_db)):
    return products_get_by_score(db=db)
