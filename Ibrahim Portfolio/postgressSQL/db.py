import csv
import psycopg2
# Connect to the local Colab database server
conn =
psycopg2.connect(user="librarian",password="read",host="127.0.0.1",port="5432",database=
"library_db")
cursor = conn.cursor()
print(“Database connection successfully established!")
setup_sql = """ 
DROP TABLE IF EXISTS borrows CASCADE;
DROP TABLE IF EXISTS books CASCADE;
CREATE TABLE books (
 book_id INT PRIMARY KEY,
 title VARCHAR(100) NOT NULL,
 copies INT NOT NULL CHECK (copies >= 0)
);
CREATE TABLE borrows (
 borrow_id SERIAL PRIMARY KEY,
 student_name VARCHAR(50) NOT NULL,
 book_id INT REFERENCES books(book_id) ON DELETE CASCADE,
 borrow_date DATE DEFAULT CURRENT_DATE
);
"""
cursor.execute(setup_sql)
conn.commit()
print(" Database blueprints and constraints successfully applied!")