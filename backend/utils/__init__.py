import sqlite3

connection = sqlite3.connect("open_read_pdf.db")
cursor = connection.cursor()


def start_db():
    try:
        cursor.execute(
            "CREATE TABLE IF NOT EXISTS documents (id integer primary key AUTOINCREMENT,path text,name text,)")
        print("Documents table was created succesfully")
    except:
        print("Table already exists")


def execute_query(query: str):
    cursor.execute(query)
