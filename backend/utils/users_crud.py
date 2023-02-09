from uuid import UUID
from sqlalchemy.orm import Session
from database.models import Users


def user_create(db: Session, user: Users):
    db_user = Users(name=user.name, email=user.email, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def user_get_one(db: Session, email: str):
    return db.query(Users).filter_by(email=email).first()


def user_login(db: Session, email: str, password: str):
    return db.query(Users).filter_by(email=email, password=password).first()
