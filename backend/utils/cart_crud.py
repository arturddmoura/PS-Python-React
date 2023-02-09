from uuid import UUID
from sqlalchemy.orm import Session
from database.models import Cart
from schemas.models import DeletePostResponse


def cart_item_create(db: Session, item: Cart):
    db_user = Cart(name=item.name, email=item.email,
                   price=item.price, image=item.image)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def cart_get_all(db: Session, email: str):
    return db.query(Cart).filter_by(email=email).all()


def cart_item_delete(db: Session, id: UUID):
    post = db.query(Cart).filter_by(id=id).all()
    if not post:
        return DeletePostResponse(detail="Item does not exist")
    db.query(Cart).filter_by(id=id).delete()
    db.commit()
    return DeletePostResponse(detail="Cart item deleted")
