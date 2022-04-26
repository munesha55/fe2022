const books = document.getElementById("books");
async function load_books(){
	let response = await fetch('/books');
	let results = await response.json();
	let html = "";
	for (let book of results){
		html += `
		<div class="book">
			<div>${book.title}</div>
			<img src="${book.url_l}" />
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