from typing import Union
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from routes import document

app = FastAPI()


app.include_router(document.router, prefix="/document")

@app.get("/api/v1")
def read_root():
    return {"Hello": "World"}


@app.get("/api/v1/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

app.mount("/", StaticFiles(directory="static"), name="static")