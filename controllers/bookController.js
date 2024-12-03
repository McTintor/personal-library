const pool = require('../db/pool');

exports.getBooks = async (req, res) => {
  try {
    const books = await pool.query('SELECT * FROM books WHERE user_id = $1', [req.user.id]);
    res.render('mainpage', { 
        books: books.rows,
        pageTitle: "Home",
        path: "/"
    });
    console.log(req.user.username)
  } catch (err) {
    console.error(err);
    res.render('mainpage', { books: [] });
  }
};

exports.addBook = async (req, res) => {
  const { title, pages, author, genre, price, store, purchase_date, description, picture_url } = req.body;
  try {
    await pool.query(
      `INSERT INTO books 
       (user_id, title, pages, author, genre, price, store, purchase_date, description, picture_url) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [req.user.id, title, pages, author, genre, price, store, purchase_date, description, picture_url]
    );
    res.redirect('/mainpage');
  } catch (err) {
    console.error(err);
    res.redirect('/mainpage');
  }
};
