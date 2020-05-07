const addBookDOM  = document.querySelector("#add-book");
const bookInputDOM = document.querySelector(".book-input");
const ulDOM = document.querySelector("#book-list ul");
const hideBooksDOM = document.querySelector("#hide");
const searchBooksDOM = document.querySelector("#search-books");
const searchBooksInputDOM = document.querySelector("#search-books input");

const allBooks = [];

function createUI(books = allBooks){
    ulDOM.innerHTML = "";
    books.forEach(book => {
        ulDOM.innerHTML += `
            <li>
                ${book}
            </li>
        `
    });
    bookInputDOM.value = "";
}

addBookDOM.addEventListener("submit",function(event){
    event.preventDefault();
    let bookName = bookInputDOM.value.trim().toLowerCase();
    allBooks.push(bookName);
    createUI();
})

hideBooksDOM.addEventListener("click",function(event){
    ulDOM.classList.toggle("toggle-display");
})

searchBooksInputDOM.addEventListener("input",function(event){
    // event.preventDefault()
    const bookName = searchBooksInputDOM.value.trim().toLowerCase();
    
    let searchedBooks = allBooks.filter(book => book.includes(bookName));
    createUI(searchedBooks);
})

