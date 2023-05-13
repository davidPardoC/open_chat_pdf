from fastapi import APIRouter
from fastapi import UploadFile
from app.controllers import document_controller

router = APIRouter()


@router.post("/uploadfile/")
async def create_upload_file(file: UploadFile):
    response = await document_controller.upload_file(file)
    return response
