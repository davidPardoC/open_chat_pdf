from fastapi import UploadFile
from utils import connect_db
import aiofiles
from app.repository.document_repository import DocumentRepository
import os

db_connection = connect_db()
document_repository = DocumentRepository(connection=db_connection)

def document_exists_in_db(documentPath:str):
    file = document_repository.get_document_by_path(documentPath)
    if len(file) > 0:
        return True
    else:
        return False

async def upload_file(file: UploadFile):

    file_name = file.filename
    file_folder_name = file_name.split(".")[0].replace(" ", "")
    path = f"./uploads/{file_folder_name}"

    if not os.path.exists(path) :
        os.mkdir(path)

    file_location: str = "./uploads/"+file_folder_name+"/"+file_name

    if not document_exists_in_db(file_location):
        document_repository.inser_document(file_name, file_location)

    async with aiofiles.open(file_location, "wb") as buffer:
        content = await file.read()
        await buffer.write(content)

    return {"path": file_location}

def delete_all_documents():
    document_repository.delete_all_documents()

def get_all_documents():
    rows = document_repository.get_all_documents()
    return rows
