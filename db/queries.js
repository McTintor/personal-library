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

async function insertBook(user_id, title, author, pages, price, store, purchase_date, picture_url, description, genre, contains) {
    try {
      console.log('Inserting book with insertBook function in queries.js: ', {
        user_id, title, author, pages, price, store, purchase_date, picture_url, description, genre, contains
      });
      await pool.query(
        `INSERT INTO books 
         (user_id, title, author, pages, price, store, purchase_date, picture_url, description, genre, contains) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [user_id, title, author, pages, price, store, purchase_date, picture_url, description, genre, contains]
      );
    } catch (error) {
      console.error('Error inserting book:', error);
      throw error; // Rethrow the error for the controller to handle
    }
  }

async function searchBook(user_id, searchText) {
  const { rows } = await pool.query(`
                SELECT * FROM books
                WHERE user_id = $1 AND 
                      (LOWER(title) LIKE LOWER($2) OR LOWER(author) LIKE LOWER($2))
            `, [user_id, `%${searchText}%`]);
  return rows;
}

async function getAllGenres() {
  const { rows } = await pool.query(`
    SELECT unnest(enum_range(NULL::book_genre)) AS genre;
  `);
  return rows.map(row => row.genre); // Map the result to get only the genre names
}

async function getAllBooksOfGenre(userId, genre) {
  const { rows } = await pool.query('SELECT * FROM books WHERE user_id = $1 AND genre = $2', [userId, `${genre}`]);
  return rows;
}

module.exports = {
  insertUser,
  getAllBooksByUserId,
  insertBook,
  searchBook,
  getAllGenres,
  getAllBooksOfGenre
};
