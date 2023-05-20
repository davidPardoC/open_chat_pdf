from typing import Union
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.routes import document, chat
from utils import start_db
from fastapi.middleware.cors import CORSMiddleware

start_db()

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins
)

app.include_router(document.router, prefix="/documents")
app.include_router(chat.router, prefix="/chat")


@app.get("/")
def health_check():
    return {"status": "ok"}
