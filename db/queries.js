const pool = require('./pool');

async function insertUser(username, firstname, lastname, password, email) {
  const { rows } = await pool.query(
    `
    INSERT INTO users (username, firstname, lastname, password, email)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [username, firstname, lastname, password, email]
  );
  return rows[0];
}

async function getAllBooksByUserId(userId) {
  const { rows } = await pool.query('SELECT * FROM books WHERE user_id = $1', [userId]);
  return rows;
}

async function insertBook(user_id, title, author, genre, pages, price, store, purchase_date, contains, picture_url, description) {
    try {
      console.log('Inserting book with insertBook function in queries.js: ', {
        user_id, title, author, genre, pages, price, store, purchase_date, contains, picture_url, description
      });
      await pool.query(
        `INSERT INTO books 
         (user_id, title, author, genre, pages, price, store, purchase_date, contains, picture_url, description) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [user_id, title, author, genre, pages, price, store, purchase_date, contains, picture_url, description]
      );
    } catch (error) {
      console.error('Error inserting book:', error);
      throw error; // Rethrow the error for the controller to handle
    }
  }

module.exports = {
  insertUser,
  getAllBooksByUserId,
  insertBook,
};
