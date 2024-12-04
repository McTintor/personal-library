const { getAllBooksByUserId, insertBook } = require('../db/queries');

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

  static async create(user_id, title, author, genre, pages, price, store, purchase_date, contains, picture_url, description) {
    console.log('create function from Book model: ' , {
        user_id, title, author, genre, pages, price, store, purchase_date, contains, picture_url, description
      });
    await insertBook(user_id, title, author, genre, pages, price, store, purchase_date, contains, picture_url, description);
  }
}

module.exports = Book;
