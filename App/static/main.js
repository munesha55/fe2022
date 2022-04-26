const books = document.getElementById("books");
async function load_books(){
	let response = await fetch('/books');
	let results = await response.json();
	let html = "";
	for (let book of results){
		html += `
		<div class="book card">
			<div>${book.title}</div>
			<img src="${book.url_l}"/>
			<span>${book.author}</span>
			<span>${book.publication_year}</span>
			<span>${book.publisher}</span>
			<div>
		`;
		for (let i = 0; i < 5; i++){
			html += `
				<span class="material-icons">star_rate</span>
			`;
		}
		html += `
			</div>
			<button onclick="load_reviews(${book.isbn}")>Review</button>
		</div>
		`;
	}

	books.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", ()=>{
	// books.innerHTML = `<h1>TEST</h1>`;
	load_books();
});

async function get_reviews(formData){
	let response = await fetch(`/createReview/${formData}`);
	let results = await response.json();
	return results;
}

const reviews = document.getElementById("reviewList");
function addReview(e){	
	let formData = new FormData(document.getElementById("reviewForm"));
	// let results = get_reviews(formData);
	let html = `<h1>${formData.get('text')}</h1>`;
	// for (let review of results){
		
	// }
	reviews.innerHTML = html;
	e.preventDefault();
}