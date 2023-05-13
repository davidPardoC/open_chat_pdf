from typing import Union
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.routes import document
from utils import start_db

start_db()

app = FastAPI()


app.include_router(document.router, prefix="/documents")


@app.get("/api/v1")
def read_root():
    return {"Hello": "World"}


app.mount("/", StaticFiles(directory="static"), name="static")
