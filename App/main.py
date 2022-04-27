import os
from flask import Flask, redirect, render_template, jsonify, request, send_from_directory, flash
from flask_cors import CORS
from sqlalchemy.exc import OperationalError
from App.models import db, get_migrate, create_db, Book, Review

def create_app():
    app = Flask(__name__, static_url_path='/static')
    CORS(app)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(app.root_path, 'data.db')
    app.config['DEBUG'] = True
    app.config['SECRET_KEY'] = 'MySecretKey'
    app.config['PREFERRED_URL_SCHEME'] = 'https'
    create_db(app)
    app.app_context().push()
    return app

app = create_app()

migrate = get_migrate(app)


@app.route('/', methods=['GET'])
def home():
  return send_from_directory('static', 'index.html')

@app.route('/books', methods=['GET'])
def get_books():
	books = Book.query.all()
	return jsonify([book.toDict() for book in books])

@app.route('/averages', methods=['GET'])
def get_averages():
	books = Book.query.all()
	averages = []
	for book in books:
		averages.append(book.get_avg_rating())
	return jsonify(averages)

@app.route('/average/<isbn>', methods=['GET'])
def get_avg_book(isbn):
	book = Book.query.filter_by(isbn=isbn).first()
	average = book.get_avg_rating()
	return average

@app.route('/reviews/<isbn>', methods=['GET'])
def get_reviews(isbn):
	reviews = Review.query.filter_by(isbn=isbn).all()
	return jsonify([review.toDict() for review in reviews])

@app.route('/createReview/<isbn>/<text>/<rating>', methods=['GET'])
def create_review(isbn, text, rating):
	review = Review()
	review.text = text
	review.rating = rating
	review.isbn = isbn
	db.session.add(review)
	db.session.commit()
	return review.toDict()

@app.route('/deleteReview/<id>', methods=['GET'])
def delete_review(id):
	review = Review.query.filter_by(id=id).first()
	db.session.delete(review)
	db.session.commit()
	return {'message': 'deleted'}

@app.route('/getbook/<isbn>', methods=['GET'])
def get_book_id(isbn):
	books = Book.query.all()
	count = 1
	for book in books:
		if book.isbn == isbn:
			id = count
		count += 1
	return id

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080, debug=True)