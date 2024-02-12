// Variables
const body = document.getElementById("Body");
const template = document.getElementById("TemplateBook").content;
const form = document.querySelector(".Add");

const bookList = [];

const key = "booksKey";

/* CLASS
    This is a book class
    It has a function which creates an HTML clone with the data
*/
class Book {
    constructor(name, author, pages, check) {
        this.id = `${author}${pages}`;
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.check = check;
    }

    Createbook() {
        const clone = template.cloneNode(true);

        clone.querySelector(".Book_title").textContent = this.name;
        clone.querySelector(".Book_author").textContent = this.author;
        clone.querySelector(".Book_pages").textContent = this.pages;

        clone.querySelector(".Button_read").dataset.id = this.id;
        clone.querySelector(".Button_delete").dataset.id = this.id;

        return clone;
    }
}

/* EVENTLISTENER
    Gets all the values ​​of the form and creates an instance of the book class
    and verify that it does not exist
*/
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let bookName = document.getElementById("BookName").value;
    let bookAuthor = document.querySelector("#BookAuthor").value;
    let bookPages = document.getElementById("BookPages").value;

    const book = new Book(bookName, bookAuthor, bookPages, false);
    let create = false;

    if(bookList.length > 0) {
        bookList.forEach(obj => {
            (obj.id === book.id) ? create = false : create = true;
        });
    } else { create = true; }
    

    if(create === true) {
        bookList.push(book);
        Render(bookList);

        document.getElementById("BookName").value = "";
        document.querySelector("#BookAuthor").value = "";
        document.getElementById("BookPages").value = 0;
    }
})

/* FUNCTION
    First remove the previous content, and then show all the classes that are in the list again
    @params class list
*/
function Render(list) {
    if (list != null) {
        body.innerHTML = ""; // Delete body content

        const fragment = document.createDocumentFragment();

        list.forEach(book => {
            fragment.appendChild(book.Createbook());
        });
        
        body.appendChild(fragment);
    }
}

/* EVENTLISTENER
    Depending on the button chosen: -first: approve the book already read. -second: delete the book.
*/
document.addEventListener("click", (e) => {
    if(e.target.dataset.id != null) {

        if(e.target.matches(".Button_read")) { // first: approve the book already read.
            bookList.forEach(book => {

                if(book.id == e.target.dataset.id) {
                    const dadElement = e.target.parentElement;
                    dadElement.classList.toggle("CasillaVacia");
                    book.check = !book.check;
                }
            });
        }

        if(e.target.matches(".Button_delete")) { // second: delete the book.

            for (let i = 0; i < bookList.length; i++) {

                if(bookList[i].id === e.target.dataset.id) {
                    const dadElement = e.target.parentElement;
                    dadElement.remove();
                    bookList.splice(i, 1);
                }
            }
        }
    }
});