from uuid import UUID

from sqlalchemy.orm import Session
from sqlalchemy import desc, asc

from database.models import Products


def products_get_by_name(db: Session):
    return db.query(Products).order_by(asc(Products.name)).all()


def products_get_by_price(db: Session):
    return db.query(Products).order_by(desc(Products.price)).all()


def products_get_by_score(db: Session):
    return db.query(Products).order_by(desc(Products.score)).all()
