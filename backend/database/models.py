import uuid

from sqlalchemy import Column, DateTime, String, Float, Numeric, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from database.connection import Base, engine


class Products(Base):
    __tablename__ = "products"

    id = Column(UUID(as_uuid=True), primary_key=True,
                default=uuid.uuid4, index=True)
    name = Column(String)
    price = Column(Float)
    score = Column(Numeric)
    image = Column(String)


class Users(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True,
                default=uuid.uuid4, index=True)
    name = Column(String)
    email = Column(String)
    password = Column(String)


class Cart(Base):
    __tablename__ = "cart"

    id = Column(UUID(as_uuid=True), primary_key=True,
                default=uuid.uuid4, index=True)
    email = Column(String)
    name = Column(String)
    price = Column(Float)
    image = Column(String)


class Orders(Base):
    __tablename__ = "orders_items"

    id = Column(UUID(as_uuid=True), primary_key=True,
                default=uuid.uuid4, index=True)
    order_id = Column(UUID(as_uuid=True))
    email = Column(String)
    name = Column(String)
    price = Column(Float)
    image = Column(String)
    date = Column(DateTime(timezone=True), server_default=func.now())


Base.metadata.create_all(engine)
