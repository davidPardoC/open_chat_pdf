from utils import connect_db 
import sqlite3

class DocumentRepository():

    connection : sqlite3.Connection
    cursor: sqlite3.Cursor

    def __init__(self, connection: sqlite3.Connection):
        self.connection = connection
        self.cursor = self.connection.cursor()
        self.cursor.row_factory = sqlite3.Row


    def inser_document(self, name: str, path: str):
        query = """INSERT INTO documents (name, path) VALUES (?,?)"""
        self.cursor.execute(query, (name, path,))
        self.commit_and_close()

    def get_document_by_path(self, path:str):
        query = """SELECT * FROM documents WHERE path = ?"""
        rows = self.cursor.execute(query, (path,)).fetchall()
        return rows

    def delete_all_documents(self):
        query = "DELETE FROM documents"
        self.cursor.execute(query)
        self.commit_and_close()

    def get_all_documents(self):
        query = "SELECT * FROM documents"
        rows = self.cursor.execute(query).fetchall()
        self.commit_and_close()
        return rows

    def commit_and_close(self):
        self.connection.commit()

    

    