const { getAllBooksByUserId, insertBook, searchBook, getAllGenres } = require('../db/queries');

class Book {
  constructor({ id, title, author, user_id }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.userId = user_id;
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
}

module.exports = Book;
