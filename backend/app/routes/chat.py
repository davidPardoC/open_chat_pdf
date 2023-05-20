from fastapi import APIRouter
from pydantic import BaseModel
from app.controllers import chat_pdf_controller

router = APIRouter()


class Message(BaseModel):
    id: int
    message: str
    path: str


@router.post("/")
def chat_with_pdf(body: Message):
    return chat_pdf_controller.chat_with_pdf(body.id, body.message, body.path)
