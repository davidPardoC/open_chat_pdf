import sqlite3


def connect_db():
    connection =  sqlite3.connect("open_read_pdf.db")
    return connection


def commit_and_close_db(connection:sqlite3.Connection):
    connection.close()


def start_db():
    connection = connect_db()
    try:
        connection.execute("CREATE TABLE documents (id integer primary key AUTOINCREMENT,path text,name text)")
        print("Documents table was created succesfully")
    except:
        print("Table already exists")
    commit_and_close_db(connection)
