from sqlalchemy.orm import Session
from database.models import Orders


def orders_get_all(db: Session, email: str):
    return db.query(Orders).order_by(Orders.date.desc(), Orders.order_id).filter_by(email=email).distinct(Orders.date, Orders.order_id).all()


def orders_get_order(db: Session, order_id: str):
    return db.query(Orders).filter_by(order_id=order_id).all()
