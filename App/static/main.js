async function get_average(isbn){
	let response = await fetch(`/average/${isbn}`);
	let result = response.json();
	return result['average'];
	reviews.innerHTML = `<h1>${result['average']}</h1>`;
}
	
const books = document.getElementById("books");
async function load_books(){
	let response = await fetch('/books');
	let results = await response.json();
	let html = "";
	for (let book of results){
		html += `
		<div class="book card" style="color: black;">
			<div>${book.title}</div>
			<img src="${book.url_l}"/>
			<span>${book.author}</span>
			<span>${book.publication_year}</span>
			<span>${book.publisher}</span>
			<div>
		`;
		for (let i = 0; i < 5; i++){
			if (i < get_average(book.isbn)){
				html += `
					<span class="material-icons checked">star_rate</span>
				`;
			}
			else {
				html += `
					<span class="material-icons">star_rate</span>
				`;
			}
		}
		html += `
			</div>
			<button onclick="load_reviews(${book.isbn}); change_title(${book.title}, ${book.isbn});">Review</button>
		</div>
		`;
	}
	books.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", ()=>{
	
	load_books();
});

// const form-title = document.getElementById("form-title");
// function change_title(title, isbn){
// 	form-title.innerHTML = `${title} - ${isbn}`;
// }

// const reviews = document.getElementById("reviewList");
// async function load_reviews(isbn){
// 	let response = await fetch(`/reviews/${isbn}`);
// 	let results = await response.json();
// 	let html = "";
// 	for (let review of results){
// 		html += `
// 		<div class="review card">
// 			<span>${review.text}</span>
// 			<div>
// 				<span>Rating</span>
// 		`;
// 		for (let i = 0; i < 5; i++){
// 			if (i < review.rating){
// 				html += `
// 					<span class="material-icons checked">star_rate</span>
// 				`;
// 			}
// 			else {
// 				html += `
// 					<span class="material-icons">star_rate</span>
// 				`;
// 			}
// 		}
// 		html += `
// 			</div>
// 			<button type="button" onclick="delete_review(${review.id});">delete</button>
// 		</div>
// 		`;
// 	}
// 	reviews.innerHTML = html;
// }

// async function add_review(formData){
// 	let response = await fetch(`/createReview/${formData}`);
// 	let results = await response.json();
// 	load_reviews(results['isbn']);
// }

// async function delete_review(id){
// 	let response = await fetch(`/deleteReview/${id}`);
// 	let results = await response.json();
// 	load_reviews(results['isbn']);
// }

// function addReview(e){	
// 	let formData = document.forms[0];
// 	add_review(formData);
// 	formData.reset();
// 	e.preventDefault();
// }