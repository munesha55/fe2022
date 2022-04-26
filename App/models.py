from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()

def get_migrate(app):
    return Migrate(app, db)

def create_db(app):
    db.init_app(app)
    db.create_all(app=app)
    
def init_db(app):
    db.init_app(app)

class Review(db.Model):
	id = db.Column('id', db.Integer, primary_key=True)
	text = db.Column('text', db.String(200), nullable=False)
	rating = db.Column('rating', db.Integer, nullable=False)
	isbn = db.Column('isbn', db.ForeignKey('book.isbn'))

class Book(db.Model):
	isbn = db.Column('isbn', db.String(100), primary_key=True, nullable=False)
	title = db.Column('title', db.String(100), nullable=False)
	author = db.Column('author', db.String(50), nullable=False)
	publication_year = db.Column('publication_year', db.Integer, nullable=False)
	publisher = db.Column('publisher', db.String(50), nullable=False)
	reviews = db.relationship('Review', backref='book', cascade='all, delete-orphan', lazy=True)
	url_s = db.Column('url_s', db.String(100), nullable=True)
	url_m = db.Column('url_m', db.String(100), nullable=True)
	url_l = db.Column('url_l', db.String(100), nullable=True)

	def toDict(self):
		return {
			'isbn': self.isbn,
			'title': self.title,
			'author': self.author,
			'publication_year': self.publication_year,
			'publisher': self.publisher,
			'url_s': self.url_s,
			'url_m': self.url_m,
			'url_l': self.url_l
		}

	def get_avg_rating(self):
		sum = 0
		for review in self.reviews:
			sum += review.rating
		return sum / len(self.reviews)