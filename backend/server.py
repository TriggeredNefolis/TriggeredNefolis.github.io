from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional, Dict, Any
import os
from dotenv import load_dotenv
import uuid
import httpx
from datetime import datetime

load_dotenv()

app = FastAPI(title="GamePort Nepal API")

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URL)
db = client["gameport_nepal"]
products_collection = db["products"]
carts_collection = db["carts"]
orders_collection = db["orders"]

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Product(BaseModel):
    id: str
    name: str
    price: float
    image: str
    category: str
    platform: str
    description: str
    inStock: bool = True

class CartItem(BaseModel):
    product_id: str
    quantity: int = 1

class Cart(BaseModel):
    id: str
    items: List[Dict[str, Any]] = []
    total: float = 0.0

class OrderRequest(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    customer_address: str
    items: List[Dict[str, Any]]
    total: float
    notes: Optional[str] = ""

# Discord webhook URL - replace with your actual webhook URL
DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN"

# Sample gaming products
SAMPLE_PRODUCTS = [
    {
        "id": str(uuid.uuid4()),
        "name": "The Witcher 3: Wild Hunt - Complete Edition",
        "price": 2500.0,
        "image": "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxjb25zb2xlfGVufDB8fHx8MTc1NTQ4NjE3OXww&ixlib=rb-4.1.0&q=85",
        "category": "RPG",
        "platform": "PC/Console",
        "description": "Award-winning open-world RPG with all DLCs included. Experience Geralt's final adventure.",
        "inStock": True
    },
    {
        "id": str(uuid.uuid4()),
        "name": "PlayStation 5 DualSense Controller",
        "price": 8500.0,
        "image": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwyfHxnYW1pbmclMjBjb250cm9sbGVyfGVufDB8fHx8MTc1NTQ4NjE3NHww&ixlib=rb-4.1.0&q=85",
        "category": "Controller",
        "platform": "PlayStation 5",
        "description": "Next-gen wireless controller with haptic feedback and adaptive triggers.",
        "inStock": True
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Cyberpunk 2077",
        "price": 3200.0,
        "image": "https://images.unsplash.com/photo-1611138290962-2c550ffd4002?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyfGVufDB8fHx8MTc1NTQ4NjE3NHww&ixlib=rb-4.1.0&q=85",
        "category": "Action RPG",
        "platform": "PC/Console",
        "description": "Open-world action-adventure RPG set in Night City. Now fully optimized!",
        "inStock": True
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Xbox Series X/S Wireless Controller",
        "price": 7500.0,
        "image": "https://images.unsplash.com/photo-1616341317041-cf93b2389ef5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxnYW1pbmclMjBjb250cm9sbGVyfGVufDB8fHx8MTc1NTQ4NjE3NHww&ixlib=rb-4.1.0&q=85",
        "category": "Controller",
        "platform": "Xbox",
        "description": "Precision gaming controller with enhanced D-pad and textured grips.",
        "inStock": True
    },
    {
        "id": str(uuid.uuid4()),
        "name": "God of War Ragnarök",
        "price": 4000.0,
        "image": "https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxjb25zb2xlfGVufDB8fHx8MTc1NTQ4NjE3OXww&ixlib=rb-4.1.0&q=85",
        "category": "Action Adventure",
        "platform": "PlayStation",
        "description": "Epic Norse mythology adventure featuring Kratos and Atreus.",
        "inStock": True
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Gaming Headset Pro",
        "price": 5500.0,
        "image": "https://images.pexels.com/photos/21067/pexels-photo.jpg",
        "category": "Accessory",
        "platform": "Universal",
        "description": "Professional gaming headset with 7.1 surround sound and noise cancellation.",
        "inStock": True
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Elden Ring",
        "price": 3800.0,
        "image": "https://images.pexels.com/photos/4842487/pexels-photo-4842487.jpeg",
        "category": "Action RPG",
        "platform": "PC/Console",
        "description": "FromSoftware's masterpiece. Explore the Lands Between in this epic adventure.",
        "inStock": True
    },
    {
        "id": str(uuid.uuid4()),
        "name": "Nintendo Switch Game Boy Edition",
        "price": 15000.0,
        "image": "https://images.unsplash.com/photo-1555864326-5cf22ef123cf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHw0fHxjb25zb2xlfGVufDB8fHx8MTc1NTQ4NjE3OXww&ixlib=rb-4.1.0&q=85",
        "category": "Console",
        "platform": "Nintendo",
        "description": "Retro-styled Nintendo Switch with classic Game Boy aesthetics.",
        "inStock": True
    }
]

@app.on_event("startup")
async def startup_event():
    # Initialize database with sample products
    existing_products = await products_collection.count_documents({})
    if existing_products == 0:
        await products_collection.insert_many(SAMPLE_PRODUCTS)

@app.get("/")
async def root():
    return {"message": "GamePort Nepal API is running!"}

@app.get("/api/products", response_model=List[Product])
async def get_products():
    products = await products_collection.find({}, {"_id": 0}).to_list(length=None)
    return products

@app.get("/api/products/{product_id}")
async def get_product(product_id: str):
    product = await products_collection.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.get("/api/cart/{cart_id}")
async def get_cart(cart_id: str):
    cart = await carts_collection.find_one({"id": cart_id}, {"_id": 0})
    if not cart:
        # Create new cart
        new_cart = {"id": cart_id, "items": [], "total": 0.0}
        await carts_collection.insert_one(new_cart)
        return new_cart
    return cart

@app.post("/api/cart/{cart_id}/add")
async def add_to_cart(cart_id: str, cart_item: CartItem):
    # Get product details
    product = await products_collection.find_one({"id": cart_item.product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Get or create cart
    cart = await carts_collection.find_one({"id": cart_id}, {"_id": 0})
    if not cart:
        cart = {"id": cart_id, "items": [], "total": 0.0}
    
    # Check if item already exists in cart
    existing_item = None
    for item in cart["items"]:
        if item["product_id"] == cart_item.product_id:
            existing_item = item
            break
    
    if existing_item:
        existing_item["quantity"] += cart_item.quantity
    else:
        cart["items"].append({
            "product_id": cart_item.product_id,
            "name": product["name"],
            "price": product["price"],
            "image": product["image"],
            "quantity": cart_item.quantity
        })
    
    # Recalculate total
    cart["total"] = sum(item["price"] * item["quantity"] for item in cart["items"])
    
    # Update or insert cart
    await carts_collection.replace_one(
        {"id": cart_id},
        cart,
        upsert=True
    )
    
    return cart

@app.delete("/api/cart/{cart_id}/remove/{product_id}")
async def remove_from_cart(cart_id: str, product_id: str):
    cart = await carts_collection.find_one({"id": cart_id}, {"_id": 0})
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    cart["items"] = [item for item in cart["items"] if item["product_id"] != product_id]
    cart["total"] = sum(item["price"] * item["quantity"] for item in cart["items"])
    
    await carts_collection.replace_one({"id": cart_id}, cart)
    return cart

@app.post("/api/orders")
async def create_order(order_request: OrderRequest):
    try:
        # Create order
        order_id = str(uuid.uuid4())
        order = {
            "id": order_id,
            "customer_name": order_request.customer_name,
            "customer_email": order_request.customer_email,
            "customer_phone": order_request.customer_phone,
            "customer_address": order_request.customer_address,
            "items": order_request.items,
            "total": order_request.total,
            "notes": order_request.notes,
            "status": "pending",
            "created_at": datetime.utcnow().isoformat()
        }
        
        # Save to database
        await orders_collection.insert_one(order)
        
        # Format order for Discord
        items_text = "\n".join([
            f"• {item['name']} x{item['quantity']} - Rs. {item['price'] * item['quantity']:,.2f}"
            for item in order_request.items
        ])
        
        discord_message = {
            "embeds": [{
                "title": "🎮 New Order - GamePort Nepal",
                "color": 0x00ff00,
                "fields": [
                    {"name": "📝 Order ID", "value": order_id[:8], "inline": True},
                    {"name": "👤 Customer", "value": order_request.customer_name, "inline": True},
                    {"name": "📧 Email", "value": order_request.customer_email, "inline": True},
                    {"name": "📞 Phone", "value": order_request.customer_phone, "inline": True},
                    {"name": "📍 Address", "value": order_request.customer_address, "inline": False},
                    {"name": "🛒 Items", "value": items_text, "inline": False},
                    {"name": "💰 Total", "value": f"Rs. {order_request.total:,.2f}", "inline": True}
                ],
                "timestamp": datetime.utcnow().isoformat(),
                "footer": {"text": "GamePort Nepal • Order Management"}
            }]
        }
        
        if order_request.notes:
            discord_message["embeds"][0]["fields"].append({
                "name": "📝 Notes",
                "value": order_request.notes,
                "inline": False
            })
        
        # Send to Discord (if webhook URL is configured)
        if DISCORD_WEBHOOK_URL != "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN":
            async with httpx.AsyncClient() as client:
                await client.post(DISCORD_WEBHOOK_URL, json=discord_message)
        
        return {
            "success": True,
            "order_id": order_id,
            "message": "Order placed successfully! You will be redirected to our Discord server.",
            "discord_url": "https://discord.gg/XjuaQBFD8W"
        }
        
    except Exception as e:
        print(f"Error creating order: {e}")
        raise HTTPException(status_code=500, detail="Failed to create order")

@app.get("/api/orders/{order_id}")
async def get_order(order_id: str):
    order = await orders_collection.find_one({"id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order