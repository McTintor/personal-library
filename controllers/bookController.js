const pool = require('../db/pool');
const { getAllBooksByUserId } = require('../db/queries');
const { create } = require('../models/Book');


exports.getBooks = async (req, res) => {
  try {
    const books = await getAllBooksByUserId(req.user.id);
    res.render('mainpage', { 
        books: books,
        pageTitle: "Home",
        path: "/"
    });
    console.log(books);
    console.log(req.user.username)
  } catch (err) {
    console.error(err);
    res.render('mainpage', { books: [] });
  }
};

exports.getAddForm = async (req, res, next) => {
  res.render('addForm', {
    pageTitle: 'Add New Book',
    path: '/new'
  })
}

exports.addBook = async (req, res) => {
  const { title, author, genre, pages, price, store, purchase_date, picture_url, description } = req.body;
  const contains = {
    title: req.body['contains[title]'],
    author: req.body['contains[author]']
  };
  console.log('console log of req.body from addBook : ' , req.body);
  try {
    await create(req.user.id, title, author, genre, pages, price, store, purchase_date, contains, picture_url, description);
    res.redirect('/mainpage');;
  } catch (err) {
    console.error(err);
    res.redirect('/mainpage');
  }
};
