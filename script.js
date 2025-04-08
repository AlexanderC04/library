const myLibrary = [];

function Book(title, author, numberOfPages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.read = read;
}
Book.prototype.changeReadStatus = function () {
  if (this.read == true) {
    this.read = false;
  } else {
    this.read = true;
  }
};

function getFormInput(event) {
  event.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const numberOfPages = document.querySelector("#pages").value;
  const read = document.querySelector("#status-read").checked;
  addBookToLibrary(title, author, numberOfPages, read);
}

function addBookToLibrary(title, author, numberOfPages, read) {
  const newBook = new Book(title, author, numberOfPages, read);
  myLibrary.push(newBook);
  displayBookshelf();
}

function displayBookshelf() {
  hideBooks();
  myLibrary.forEach((book) => {
    displayBook(book);
  });
  document.querySelector(".form").close();
  clearFormInput();
}

function hideBooks() {
  document.querySelector(".bookshelf__container").textContent = "";
}
function displayBook(book) {
  const bookshelfContainer = document.querySelector(".bookshelf__container");
  const bookContainer = document.createElement("div");
  const title = document.createElement("h2");
  const author = document.createElement("p");
  const numberOfPages = document.createElement("p");
  const read = document.createElement("p");
  const deleteBookButton = document.createElement("button");
  const deleteBookButtonIcon = document.createElement("img");
  const changeBookStatusButton = document.createElement("button");
  const changeBookStatusButtonIcon = document.createElement("img");

  bookContainer.setAttribute("class", "book");
  bookContainer.setAttribute("data-id", `${book.id}`);

  title.setAttribute("class", "book__title");
  author.setAttribute("class", "book__author");
  numberOfPages.setAttribute("class", "book__pages");
  read.setAttribute("class", "book__status");
  deleteBookButton.setAttribute("class", " book__delete");
  if (book.read) {
    changeBookStatusButton.setAttribute("class", "book__change-status read");
    changeBookStatusButtonIcon.setAttribute("class", "book__icon");
    changeBookStatusButtonIcon.setAttribute("src", "images/book-check.svg");
    changeBookStatusButtonIcon.setAttribute("alt", "Book Check Icon");
  } else {
    changeBookStatusButton.setAttribute("class", "book__change-status unread");
    changeBookStatusButtonIcon.setAttribute("class", "book__icon");
    changeBookStatusButtonIcon.setAttribute("src", "images/eye-off.svg");
    changeBookStatusButtonIcon.setAttribute("alt", "Eye off Icon");
  }

  title.textContent = book.title;
  author.textContent = book.author;
  numberOfPages.textContent = book.numberOfPages;
  read.textContent = book.read === true ? "Read" : "Not read yet";
  deleteBookButton.textContent = "Delete";

  deleteBookButton.addEventListener("click", deleteBook);
  changeBookStatusButton.addEventListener("click", updateBookStatus);

  bookshelfContainer.appendChild(bookContainer);
  bookContainer.appendChild(title);
  bookContainer.appendChild(author);
  bookContainer.appendChild(numberOfPages);
  bookContainer.appendChild(read);
  bookContainer.appendChild(deleteBookButton);
  bookContainer.appendChild(changeBookStatusButton);
  deleteBookButton.appendChild(deleteBookButtonIcon);
  changeBookStatusButton.appendChild(changeBookStatusButtonIcon);
}

function deleteBook(buttonClick) {
  const bookToDeleteId = getBookID(buttonClick);
  let bookToDeleteIndex = myLibrary.findIndex(
    (book) => book.id === bookToDeleteId
  );
  myLibrary.splice(bookToDeleteIndex, 1);
  displayBookshelf();
}

function updateBookStatus(buttonClick) {
  const bookToUpdateId = getBookID(buttonClick);
  const bookToUpdate = myLibrary.find((book) => book.id === bookToUpdateId);
  if (bookToUpdate) {
    bookToUpdate.changeReadStatus();
    displayBookshelf();
  }
}

function getBookID(buttonClick) {
  const buttonClicked = buttonClick.target;
  const bookToUpdate = buttonClicked.parentNode;
  return bookToUpdate.dataset.id;
}

function displayForm() {
  document.querySelector(".form").showModal();
}

function hideForm() {
  document.querySelector(".form").close();
  clearFormInput();
}

function clearFormInput() {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#status-read").checked = false;
}

document
  .querySelector(".form__container")
  .addEventListener("submit", getFormInput);

document.querySelector(".btn__add-book").addEventListener("click", displayForm);
document.querySelector(".btn__add-book").addEventListener("click", displayForm);

document
  .querySelector(".form__close-button")
  .addEventListener("click", hideForm);
document.querySelector(".form").addEventListener("close", clearFormInput);
