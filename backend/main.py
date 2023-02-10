from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.products import router as api_products
from routes.users import router as api_users
from routes.cart import router as api_cart
from routes.orders import router as api_orders


app = FastAPI()

origins = [
    "http://localhost:5173",
    "localhost:5173"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(router=api_products, prefix="/products")
app.include_router(router=api_users, prefix="/user")
app.include_router(router=api_cart, prefix="/cart")
app.include_router(router=api_orders, prefix="/orders")


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome"}
