const reviews = document.getElementById("reviewList");
async function get_averages(){
	let response = await fetch(`/averages`);
	let results = await response.json();
	return results;
}

const formTitle = document.getElementById("formTitle");
const crbutton = document.getElementById("createReviewButton");
const holder = document.getElementById("holder");
function change_title(title, isbn){
	formTitle.innerHTML = `<span>${title} - ${isbn}</span>`;
	holder.innerHTML = `${isbn}`;
	crbutton.removeAttribute('disabled');
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
		<div class="book card" id="${count+1}" style="color: black;">
			<div>${book.title}</div>
			<img src="${book.url_l}"/>
			<span>${book.author}</span>
			<span>${book.publication_year}</span>
			<span>${book.publisher}</span>
			<div class="rating">
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
			<button type="button" onclick="load_reviews('${book.isbn}'); change_title('${book.title}','${book.isbn}');">Review</button>
		</div>
		`;
		count += 1;
	}
	books.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", ()=>{
	load_books();
});

async function get_reviews(isbn){
	let response = await fetch(`/reviews/${isbn}`);
	let results = await response.json();
	return results;
}

async function load_reviews(isbn){
	let results = await get_reviews(isbn);
	let html = "";
	for (let review of results){
		html += `
		<div class="review card">
			<span>${review.text}</span>
			<div>
				<span>Rating</span>
		`;
		for (let i = 0; i < 5; i++){
			if (i < review.rating){
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
			<button type="button" onclick="deleteReview(${review.id});">delete</button>
		</div>
		`;
	}
	reviews.innerHTML = html;
}

// async update_ratings(isbn, rating){
// 	let response = await fetch(`/getbook/${isbn}`);
// 	let result = await response.json();
// 	let stars = document.getElementById(result).getElementsByClassName("rating");
// 	stars[0].innerHTML = `${result}`;
// }

async function get_average(isbn){
	let response = await fetch(`/average/${isbn}`);
	let result = await response.json();
	update_ratings(isbn, result);
}

async function add_review(isbn, formData){
	let response = await fetch(`/createReview/${isbn}/${formData.text.value}/${formData.rating.value}`);
	let results = await response.json();
	await load_reviews(holder.innerHTML);
	// get_average(holder.innerHTML);
}

async function delete_review(id){
	let response = await fetch(`/deleteReview/${id}`);
	let result = await response.json();
	await load_reviews(holder.innerHTML);
	// get_average(holder.innerHTML);
}

function deleteReview(id){
	delete_review(id);
}

function addReview(e){	
	let formData = document.forms[0];
	add_review(holder.innerHTML, formData);
	formData.reset();
	e.preventDefault();
}