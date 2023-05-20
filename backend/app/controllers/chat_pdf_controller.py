from PyPDF2 import PdfReader


def request_pdf(path: str):
    pdf_file = open(path, "rb")
    print("pdf_file", pdf_file, path)
    return pdf_file

# TODO: Save pdf raw text in disk so not have to proccess again in each request
def chat_with_pdf(id: int, message: str, path: str):
    pdf = request_pdf(path)
    pdf_reader = PdfReader(pdf)
    pdf_text = ""
    for page in pdf_reader.pages:
        pdf_text += f"\n{page.extract_text()}"
    return pdf_text
