from uuid import UUID

from sqlalchemy.orm import Session

from database.models import Products
from schemas.models import DeletePostResponse, Product, UpdatePost


def products_get_all(db: Session):
    return db.query(Products).all()
