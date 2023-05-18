from fastapi import APIRouter, UploadFile, HTTPException
from app.controllers import document_controller

router = APIRouter()


"""Upload a file"""
@router.post("/uploadfile/")
async def create_upload_file(file: UploadFile):

    if file.size <= 0:
        raise HTTPException(status_code=400, detail="Please uplaod a file")
     
    response = await document_controller.upload_file(file)

    if "error" in response and response["error"] == 400:
        raise HTTPException(status_code=400, detail="Not suported file")
    

    return response


"""Get all documents saved"""
@router.get("/")
async def get_docuements():
    return document_controller.get_all_documents();

@router.delete("/")
def delete_all_documents():
    return document_controller.delete_all_documents()