from fastapi import APIRouter

router = APIRouter()

@router.get(path="/", tags="document")
async def post_document():
    print("Hola Mundo")
    return {"message":"Test document"}