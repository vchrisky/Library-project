
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    get readOrNot() {
        return this.read ? true : false;
    }

    toggleRead() {
        this.read = !this.read;
    }

    addBookToLibrary() {
        return myLibrary.push(this); 
    }
}


const existingBooks = JSON.parse(localStorage.getItem('books'));

const myLibrary = existingBooks || [];

/**
 * Displays books in a library.
 * @param {Array} myLibrary - An array of book objects representing the books in the library.
*/
function displayBook(myLibrary) {
    
    const displayDiv = document.querySelector(".books-display");
    displayDiv.innerHTML = "";
    
    myLibrary.forEach((book) => {
        const index = myLibrary.indexOf(book);
        const bookDiv = document.createElement("div");
        displayDiv.appendChild(bookDiv);

        const headDtls = document.createElement("div");
        bookDiv.appendChild(headDtls);

        const bookNo = document.createElement("h3");
        bookNo.textContent = `Book ${index + 1}`;
        bookNo.classList.add("book-number");
        headDtls.appendChild(bookNo);

        const dltBtn = document.createElement("button");
        dltBtn.textContent = "Delete";
        dltBtn.classList.add("delete-button");
        headDtls.appendChild(dltBtn);

        const bookDtls = document.createElement("div");
        bookDiv.appendChild(bookDtls);

        const headClmn = document.createElement("div");
        headClmn.classList.add("head-column");
        bookDtls.appendChild(headClmn);

        const valueClmn = document.createElement("div");
        valueClmn.classList.add("value-column");
        bookDtls.appendChild(valueClmn);

        const headTitle = document.createElement("div");
        const headAuthor = document.createElement("div");
        const headPages = document.createElement("div");
        const readBtn = document.createElement("button");

        headTitle.textContent = "TITLE:";
        headAuthor.textContent = "AUTHOR:";
        headPages.textContent = "NO. OF PAGES:";
        readBtn.textContent = book.readOrNot ? 'Not Read' : "READ";
        readBtn.classList.add("read-btn", "button");

        headClmn.append(headTitle, headAuthor, headPages, readBtn);

        const displayTitle = document.createElement("div");
        const displayAuthor = document.createElement("div");
        const displayPages = document.createElement("div");
        const displayRead = document.createElement("div");

        displayTitle.textContent = book.title;
        displayAuthor.textContent = book.author;
        displayPages.textContent = book.pages;
        displayRead.textContent = book.readOrNot ? "I have read this book" : "Not yet read";
        
        valueClmn.append(displayTitle, displayAuthor, displayPages, displayRead);

        dltBtn.addEventListener("click", () => {
            let confirm = prompt(`Are you sure you want to delete ${book.title} permanently?`, "Yes");

            if (confirm) {
                myLibrary.splice(index, 1);
                localStorage.setItem( 'books', JSON.stringify(myLibrary));
                displayBook(myLibrary);
                alert(`You have Removed "${book.title}"`);   
            }
        });
        
        readBtn.addEventListener("click", () => {
            book.toggleRead();
            readBtn.textContent = book.readOrNot ?  "NOT READ" : "READ" ;
            displayRead.textContent = book.read ? "I have read this book" : "Not yet read";
        });
    });
}

displayBook(myLibrary);

const modalDisplay = (() => {
    let addBookBtn = document.querySelector("#add-book");
    let addBookModal = document.getElementById("book-modal");
    let closeModal = document.getElementById("close-modal");
    let titleInput = document.getElementById("title");
    let authorInput = document.getElementById("author");
    let pagesInput = document.getElementById("pages");
    let readInput = document.getElementById("read");
    let bookForm = document.querySelector(".modal-form");

    addBookBtn.addEventListener('click', () => {
        addBookModal.showModal();
    });

    closeModal.addEventListener('click', (event) => {
        event.preventDefault();
        addBookModal.close();
    });

    bookForm.onsubmit = () => {
        const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
        newBook.addBookToLibrary();
        localStorage.setItem( 'books', JSON.stringify(myLibrary));
        displayBook(myLibrary);
    }
})();
