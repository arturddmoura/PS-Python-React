import uuid

from sqlalchemy import Column, String, Float, Numeric
from sqlalchemy.dialects.postgresql import UUID

from database.connection import Base, engine


class Products(Base):
    __tablename__ = "products"

    id = Column(UUID(as_uuid=True), primary_key=True,
                default=uuid.uuid4, index=True)
    name = Column(String)
    price = Column(Float)
    score = Column(Numeric)
    image = Column(String)


Base.metadata.create_all(engine)
