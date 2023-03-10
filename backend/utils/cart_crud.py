from uuid import UUID
from sqlalchemy.orm import Session
from database.models import Cart, Orders
from schemas.models import DeletePostResponse
import uuid


def cart_item_create(db: Session, item: Cart):
    db_user = Cart(name=item.name, email=item.email,
                   price=item.price, image=item.image)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def cart_get_all(db: Session, email: str):
    return db.query(Cart).filter_by(email=email).all()


def cart_get_number(db: Session, email: str):
    return db.query(Cart.price).filter_by(email=email).count()


def cart_item_delete(db: Session, id: UUID):
    post = db.query(Cart).filter_by(id=id).all()
    if not post:
        return DeletePostResponse(detail="Item does not exist")
    db.query(Cart).filter_by(id=id).delete()
    db.commit()
    return DeletePostResponse(detail="Cart item deleted")


def cart_checkout(db: Session, email: str):
    cart = db.query(Cart).filter_by(email=email).all()
    if not cart:
        return DeletePostResponse(detail="Cart is empty")
    myuuid = uuid.uuid4()
    for item in cart:
        item_row = Orders(order_id=myuuid, email=item.email, name=item.name,
                          price=item.price, image=item.image)
        db.add(item_row)

    db.query(Cart).filter_by(email=email).delete()
    db.commit()
    return DeletePostResponse(detail="Cart deleted")
