import sqlite3


def connect_db():
    return sqlite3.connect("open_read_pdf.db")

def commit_and_close_db(connection:sqlite3.Connection):
    connection.commit()
    connection.close()


def start_db():
    connection = connect_db()
    try:
        connection.execute("CREATE TABLE documents (id integer primary key AUTOINCREMENT,path text,name text)")
        print("Documents table was created succesfully")
    except:
        print("Table already exists")
    commit_and_close_db(connection)


def execute_query(query: str):
    connection = connect_db()
    connection.execute(query)
    commit_and_close_db(connection)

def execute_select_query(query: str):
    connection = connect_db()
    connection.row_factory = sqlite3.Row
    rows = connection.execute(query).fetchall()
    commit_and_close_db(connection)
    return rows
