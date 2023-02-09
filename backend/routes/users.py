from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.connection import get_db
from schemas.models import DeletePostResponse, Users, UpdatePost
from utils.users_crud import (
    user_create,
    user_get_one
)

router = APIRouter(tags=["users"])


@router.post("/create", status_code=status.HTTP_201_CREATED, response_model=Users)
def create_post(user: Users, db: Session = Depends(get_db)):
    exists = user_get_one(db=db, email=user.email)
    if exists:
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="E-mail is already registered"
        )
    return user_create(db=db, user=user)
