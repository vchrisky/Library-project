const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = function () {
        if (read) {
            this.readBook = true;
            return "I have read this book";
        }else{
            this.readBook = false;
            return "Not read yet";
        }
    }
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read()}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    if (typeof(title) === "object") {
        myLibrary.push(title);
    } else {
        const newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook); 
    }
}
//Manually added books
const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, "read");

addBookToLibrary("Harry Potter", "J.K. Rowling", 365);
addBookToLibrary(theHobbit);
addBookToLibrary("Things Fall Apart", "Chinua Achebe", 235, "read");
addBookToLibrary("I Will Marry When I Want");
addBookToLibrary("Purple Hibiscus", "Chimamanda Ngozi Adichie", 316, "read")
console.log(myLibrary);


const displayDiv = document.querySelector(".books-display");
let bookNumber = 1;
let arrayNo = 0;


function displayBook() {
    myLibrary.forEach(function(e){
        let bookDiv = displayDiv.appendChild(document.createElement("div"));

        let headDtls = bookDiv.appendChild(document.createElement("div"));

        let bookNo = headDtls.appendChild(document.createElement("h3"));
        bookNo.textContent = `Book ${bookNumber++}`;
        bookNo.classList.add("book-number");
        let dltBtn = headDtls.appendChild(document.createElement("button"));
        dltBtn.textContent = "Delete";
        dltBtn.setAttribute("value", `${arrayNo++}`);

        let bookDtls = bookDiv.appendChild(document.createElement("div"));
        
        let headClmn = bookDtls.appendChild(document.createElement("div"));
        headClmn.classList.add("head-column");
        let valueClmn = bookDtls.appendChild(document.createElement("div"));
        valueClmn.classList.add("value-column");
    
        let headTitle = headClmn.appendChild(document.createElement("div"));
        let headAuthor = headClmn.appendChild(document.createElement("div"));
        let headPages = headClmn.appendChild(document.createElement("div"));
        let readBtn = headClmn.appendChild(document.createElement("button"));

        headTitle.textContent = `TITLE:`;
        headAuthor.textContent = `AUTHOR:`;
        headPages.textContent = `NO. OF PAGES:`;
        readBtn.textContent = "READ";
        readBtn.classList.add("read-btn", "button");

        let displayTitle = valueClmn.appendChild(document.createElement("div"));
        let displayAuthor = valueClmn.appendChild(document.createElement("div"));
        let displayPages = valueClmn.appendChild(document.createElement("div"));
        let displayRead = valueClmn.appendChild(document.createElement("div"));
    
        displayTitle.textContent = `${e.title}`;
        displayAuthor.textContent = `${e.author}`;
        displayPages.textContent = `${e.pages}`;
        displayRead.textContent = `${e.read()}`;


        dltBtn.addEventListener('click', () => {
            myLibrary.splice(dltBtn.value,1);
            console.log(myLibrary);
            displayDiv.innerHTML = "";
            bookNumber = 1;
            arrayNo = 0;
            displayBook();
            alert(`You have Removed "${e.title}"`);
            })

        readBtn.addEventListener('click', () => {
            if (e.readBook) {
                readBtn.textContent = "READ";
                displayRead.textContent = `Not yet read`;
                e.readBook = false;
            } else {
                readBtn.textContent = "NOT READ";
                displayRead.textContent = `I have read this book`;
                e.readBook = true;
            }
            console.log(myLibrary);
        })    
        }
    )
}

displayBook();

let addBookBtn = document.querySelector("#add-book");
let addBookModal = document.getElementById("book-modal");
let closeModal = document.getElementById("close-modal");
let submitBook = document.getElementById("submit");
let titleInput = document.getElementById("title");
let authorInput = document.getElementById("author");
let pagesInput = document.getElementById("pages");
let readInput = document.getElementById("read");
let bookForm = document.querySelector(".modal-form");

addBookBtn.addEventListener('click', () => {
    // titleInput.focus();
    addBookModal.showModal(); 
})

closeModal.addEventListener('click', (event) => {
    event.preventDefault();
    addBookModal.close();
})

submitBook.addEventListener('click', (event) => {
    // event.preventDefault();
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
    console.log(myLibrary);
    displayDiv.innerHTML = "";
    bookNumber = 1;
    arrayNo = 0;
    displayBook();
    // addBookModal.close();
    // addBookModal.textContent = "";
})
