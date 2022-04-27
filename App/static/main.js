const reviews = document.getElementById("reviewList");
async function get_averages(){
	let response = await fetch(`/averages`);
	let results = await response.json();
	return results;
}

const formTitle = document.getElementById("formTitle");
function change_title(title, isbn){
	reviews.innerHTML = `<span>${title} - ${isbn}</span>`;
}
	
const books = document.getElementById("books");
async function load_books(){
	let averages = await get_averages();
	let html = "";
	let count = 0;
	let response = await fetch('/books');
	let results = await response.json();
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
			if (i < averages[count]){
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
			<button type="button" onclick="change_title(${book.title}, ${book.isbn});">Review</button>
		</div>
		`;
		count += 1;
	}
	books.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", ()=>{
	load_books();
});




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