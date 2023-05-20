from PyPDF2 import PdfReader


def request_pdf(path: str):
    pdf_file = open(path, "rb")
    print("pdf_file", pdf_file, path)
    return pdf_file


def chat_with_pdf(id: int, message: str, path: str):
    pdf = request_pdf(path)
    pdf_reader = PdfReader(pdf)
    page = pdf_reader.pages[0].extract_text()
    print(page)
    return page
