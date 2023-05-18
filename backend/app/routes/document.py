from fastapi import APIRouter
from fastapi import UploadFile
from app.controllers import document_controller

router = APIRouter()


"""Upload a file"""
@router.post("/uploadfile/")
async def create_upload_file(file: UploadFile):
    response = await document_controller.upload_file(file)
    return response

"""Get all documents saved"""
@router.get("/")
async def get_docuements():
    return document_controller.get_all_documents();

@router.delete("/")
def delete_all_documents():
    return document_controller.delete_all_documents()