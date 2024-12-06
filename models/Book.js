const { getAllBooksByUserId, insertBook, searchBook, getAllGenres, getAllBooksOfGenre } = require('../db/queries');

class Book {
  constructor({ id, user_id, title, author, pages, price, store, purchase_date, picture_url, description, genre, contains }) {
    this.id = id;
    this.userId = user_id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.price = price;
    this.store = store;
    this.purchase_date = purchase_date;
    this.picture_url = picture_url;
    this.description = description;
    this.genre = genre;
    this.contains = contains;
  }

  static async getAllBooksForUser(userId) {
    const booksData = await getAllBooksByUserId(userId);
    return booksData.map((bookData) => new Book(bookData));
  }

  static async create(user_id, title, author, pages, price, store, purchase_date, picture_url, description, genre, contains) {
    console.log('create function from Book model: ' , {
        user_id, title, author, pages, price, store, purchase_date, picture_url, description, genre, contains
      });
    await insertBook(user_id, title, author, pages, price, store, purchase_date, picture_url, description, genre, contains);
  }

  static async searchBookByQuery(user_id, searchText) {
    const booksData = await searchBook(user_id, searchText);
    return booksData.map((bookData) => new Book(bookData));
  }

  static async getAllBookGenres() {
    return await getAllGenres();
  }

  static async getAllBooksByGenre(user_id, genre) {
    const booksData = await getAllBooksOfGenre(user_id, genre);
    return booksData.map((bookData) => new Book(bookData));
  }
}

module.exports = Book;
