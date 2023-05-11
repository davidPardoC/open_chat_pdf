from typing import Annotated
from fastapi import APIRouter
from fastapi import FastAPI, File, UploadFile

router = APIRouter()

@router.post(path="/", tags="document")
async def create_file(file: Annotated[bytes, File()]):
    return {"file_size": len(file)}

@router.post("/uploadfile/")
async def create_upload_file(file: UploadFile):
    return {"filename": file.filename}