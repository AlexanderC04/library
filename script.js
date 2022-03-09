const library = [];

function Book(title, author, pagesNumber, status) {
  this.title = title;
  this.author = author;
  this.pagesNumber = pagesNumber;
  this.status = status;
}

function addBookToLibrary(title, author, numberPages, status) {
  const newBook = new Book(title, author, numberPages, status);
  library.push(newBook);
  printDom();
}

function printDom() {
  removeBooksDom();
  for (let i = 0; i < library.length; i++) {
    const lol = library[i];
    addBookDOM(lol);
  }
}

document.addEventListener("click", someListener);
function someListener(event) {
  let element = event.target;
  if (element.classList.contains("book__delete")) {
    deleteBook(element);
  } else if (element.classList.contains("book__change-status")) {
    changeStatus(element);
  }
}

function changeStatus(target) {
  let bookAction = target.parentNode;
  let book = bookAction.parentNode;
  let bookInfo = book.firstChild;
  let titleBook = bookInfo.childNodes[0];
  let authorBook = bookInfo.childNodes[1];
  let pagesBook = bookInfo.childNodes[2];
  for (let i = 0; i < library.length; i++) {
    if (
      library[i].title == titleBook.textContent &&
      library[i].author == authorBook.textContent &&
      library[i].pagesNumber == pagesBook.textContent
    ) {
      if (library[i].status == "Read") {
        library[i].status = "No read";
      } else if (library[i].status == "No read") {
        library[i].status = "Read";
      }
      printDom();
      break;
    }
  }
  console.log(library);
}

function deleteBook(target) {
  let bookAction = target.parentNode;
  let book = bookAction.parentNode;
  let bookInfo = book.firstChild;
  let titleBook = bookInfo.childNodes[0];
  let authorBook = bookInfo.childNodes[1];
  let pagesBook = bookInfo.childNodes[2];
  for (let i = 0; i < library.length; i++) {
    if (
      library[i].title == titleBook.textContent &&
      library[i].author == authorBook.textContent &&
      library[i].pagesNumber == pagesBook.textContent
    ) {
      library.splice(i, 1);
      printDom();
      break;
    }
  }
}

function getUserInput(event) {
  event.preventDefault();

  const titleValue = titleField.value;
  const authorValue = authorField.value;
  const numberPagesValue = numberPagesField.value;
  const statusValue = displayRadioValue();

  addBookToLibrary(titleValue, authorValue, numberPagesValue, statusValue);
  inactiveAddBook();
}

function clearField() {
  titleField.value = "";
  authorField.value = "";
  numberPagesField.value = "";
}

function displayRadioValue() {
  var ele = document.getElementsByName("status");
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      return ele[i].value;
    }
  }
}

function removeBooksDom() {
  let e = document.querySelector(".book-container");
  let child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
}

const titleField = document.getElementById("title");
const authorField = document.getElementById("author");
const numberPagesField = document.getElementById("pages");

let overlay = document.querySelector(".overlay");
overlay.addEventListener("click", inactiveAddBook);

let addBook = document.querySelector(".btn__add-book");
addBook.addEventListener("click", activeAddBook);
let form = document.querySelector(".form__add-book");
form.addEventListener("submit", getUserInput);
let formClose = document.querySelector(".close-form");
formClose.addEventListener("click", inactiveAddBook);

function activeAddBook() {
  document.querySelector(".form").classList.add("active");
  document.querySelector(".overlay").classList.add("active");
  clearField();
}

function inactiveAddBook() {
  document.querySelector(".form").classList.remove("active");
  document.querySelector(".overlay").classList.remove("active");
  clearField();
}

function addBookDOM(NewBookValue) {
  let bookContainer = document.querySelector(".book-container");
  let bookDom = document.createElement("div");
  bookDom.classList.add("book");
  bookContainer.appendChild(bookDom);

  let bookDomInfo = document.createElement("div");
  bookDomInfo.classList.add("book__info");
  bookDom.appendChild(bookDomInfo);

  let bookName = document.createElement("div");
  let bookAuthor = document.createElement("div");
  let bookPages = document.createElement("div");
  let bookStatus = document.createElement("div");

  bookName.classList.add("book__name");
  bookAuthor.classList.add("book__author");
  bookPages.classList.add("book__pages");
  bookStatus.classList.add("book__status");

  bookDomInfo.appendChild(bookName);
  bookDomInfo.appendChild(bookAuthor);
  bookDomInfo.appendChild(bookPages);
  bookDomInfo.appendChild(bookStatus);

  bookName.textContent = NewBookValue.title;
  bookAuthor.textContent = NewBookValue.author;
  bookPages.textContent = NewBookValue.pagesNumber;
  bookStatus.textContent = NewBookValue.status;

  let bookDomAction = document.createElement("div");
  bookDomAction.classList.add("book__action");
  bookDom.appendChild(bookDomAction);

  let bookDomDelete = document.createElement("button");
  bookDomDelete.classList.add("book__delete");
  bookDomAction.appendChild(bookDomDelete);

  let bookDeleteText = document.createElement("p");
  let bookDeleteIcon = document.createElement("img");

  bookDeleteIcon.setAttribute("class", "book__icon");
  bookDeleteIcon.setAttribute("src", "images/book-cancel.svg");
  bookDeleteIcon.setAttribute("alt", "Delete book icon");

  bookDomDelete.appendChild(bookDeleteText);
  bookDomDelete.appendChild(bookDeleteIcon);
  bookDeleteText.textContent = "Delete";

  let bookDomChangeStatus = document.createElement("button");
  let bookChangeStatusIcon = document.createElement("img");

  if (NewBookValue.status == "No read") {
    bookDomChangeStatus.setAttribute(
      "class",
      "book__change-status mark-as-unread"
    );
    bookChangeStatusIcon.setAttribute("class", "book__icon");
    bookChangeStatusIcon.setAttribute("src", "images/eye-off.svg");
    bookChangeStatusIcon.setAttribute("alt", "Eye off Icon");
  } else if (NewBookValue.status == "Read") {
    bookDomChangeStatus.setAttribute(
      "class",
      "book__change-status mark-as-read"
    );
    bookChangeStatusIcon.setAttribute("class", "book__icon");

    bookChangeStatusIcon.setAttribute("src", "images/book-check.svg");
    bookChangeStatusIcon.setAttribute("alt", "Book Check Icon");
  }
  bookDomAction.appendChild(bookDomChangeStatus);
  bookDomChangeStatus.appendChild(bookChangeStatusIcon);
}
