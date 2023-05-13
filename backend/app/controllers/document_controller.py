from fastapi import UploadFile
from utils import execute_query, execute_select_query
import aiofiles
import os


async def upload_file(file: UploadFile):

    file_name = file.filename
    file_folder_name = file_name.split(".")[0].replace(" ", "")
    os.mkdir("./uploads/"+file_folder_name)
    file_location = "./uploads/"+file_folder_name+"/"+file_name

    query = f"insert into documents(path,name) values ('{file_location}','{file_name}')"

    execute_query(query)

    async with aiofiles.open(file_location, "wb") as buffer:
        content = await file.read()
        await buffer.write(content)

    return {"path": file_location}


def get_all_documents():
    rows = execute_select_query("SELECT * FROM documents;")
    return rows
