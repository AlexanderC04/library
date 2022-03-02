function Book(title, author, pagesNumber, status) {
  this.title = title;
  this.author = author;
  this.pagesNumber = pagesNumber;
  this.status = status;
}
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
const youMama = new Book("LALA", "J.R.R. Tolkien", 295, "not read yet");

// console.log(theHobbit.info());

function addBookToLibrary() {
  // do stuff here
}

let library = [theHobbit];
library.unshift(youMama);
for (let i = 0; i < library.length; i++) {
  const lol = library[i];
  console.log(lol);
}
// console.log(library[0]);
