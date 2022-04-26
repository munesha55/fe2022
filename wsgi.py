import csv
from App import create_db, db, app
from App.models import Book


@app.cli.command("init")
def initialize():
	create_db(app)
	file = open('books.csv', 'r')
	rows = csv.DictReader(file)
	for row in rows:
		newBook = Book()
		newBook.isbn = row['ISBN']
		newBook.title = row['Book-Title']
		newBook.author = row['Book-Author']
		newBook.publication_year = row['Year-Of-Publication']
		newBook.publisher = row['Publisher']
		newBook.url_s = row['Image-URL-S']
		newBook.url_m = row['Image-URL-M']
		newBook.url_l = row['Image-URL-L']
		db.session.add(newBook)
		db.session.commit()
	print('database intialized')
