from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.connection import get_db
from schemas.models import DeletePostResponse, Product, UpdatePost
from utils.products_crud import (
    products_get_all,
)

router = APIRouter(tags=["products"])


@router.get("/list/all", status_code=status.HTTP_200_OK, response_model=List[Product])
def get_all_products(db: Session = Depends(get_db)):
    return products_get_all(db=db)
