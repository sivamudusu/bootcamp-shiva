const Logger = {
  log(message) {
    console.log(`[Log] : ${message}`);
  },
};

class Author {
  constructor(name, birthYear, nationality) {
    this.name = name;
    this.birthYear = birthYear;
    this.nationality = nationality;
  }
}

class Book {
  constructor(
    title,
    authors = [],
    pages = 0,
    topic = "General",
    publicationDate
  ) {
    if (!title | (authors.length === 0)) {
      throw new Error("title and atleast one author is mandatory");
    }
    this.title = title;
    this.authors = authors;
    this.pages = pages;
    this.topic = topic;
    this.status = "Available";
    this.publicationDate = publicationDate;
    //added pulication date property

    Object.assign(this, Logger);
    this.log(
      `New Book created: ${this.title} by ${this.authors
        .map((autor) => autor.name)
        .join(", ")}`
    );
  }

  markAsBorrowed() {
    this.status = "Borrowed";
  }
  // added a function that marks this book as borrowed
}

class FictionBook extends Book {
  constructor(title, authors, pages, genre) {
    super(title, authors, pages, "Fiction");
    this.genre = genre;
  }
  getRecommendation() {
    return `Check out this exciting ${this.genre} fiction book: "${this.title}"!`;
  }
}

class NonFictionBook extends Book {
  constructor(title, authors, pages, field) {
    super(title, authors, pages, "Non-Fiction");
    this.field = field;
  }

  getOverview() {
    return `Explore the ${this.field} field with "${this.title}" - a great non-fiction read!`;
  }
}

class Catalog {
  constructor() {
    this.catalog = new Map();
  }

  addBook(book) {
    if (!this.catalog.has(book.topic)) {
      this.catalog.set(book.topic, []);
    }
    this.catalog.get(book.topic).push(book);
  }
}
class Library {
  constructor() {
    this.catalog = new Catalog();
    Object.assign(this, Logger);
  }

  addBook(book) {
    this.catalog.addBook(book);
    this.log(`Book added to the library: ${book.title}`);
  }
  borrowBook(title, borrower) {
    //this function will return a book if its avilable and sets the book status accordingly
    for (const books of this.catalog.catalog.values()) {
      //   console.log(this.catalog.catalog.values());
      for (const book of books) {
        if (book.title === title && book.status === "Available") {
          book.markAsBorrowed();
          this.log(`Book borrowed: ${book.title} by ${borrower}`);
          return book;
        }
      }
    }
    this.log(`Book not available for borrowing: ${title}`);
    return null;
  }
}

const author1 = new Author("F. Scott Fitzgerald", 1896, "American");
const author2 = new Author("Zelda Fitzgerald", 1900, "American");

const fictionBook = new FictionBook(
  "The Great Gatsby",
  [author1],
  300,
  "Classic"
);
const nonFictionBook = new NonFictionBook(
  "Sapiens: A Brief History of Humankind",
  [author2],
  400,
  "Anthropology"
);

const myLibrary = new Library();
myLibrary.addBook(fictionBook);
myLibrary.addBook(nonFictionBook);

const borrowedBook = myLibrary.borrowBook(
  "Sapiens: A Brief History of Humankind",
  "shiva"
);
