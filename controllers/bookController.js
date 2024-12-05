const { create, getAllBooksForUser, searchBookByQuery, getAllBookGenres } = require('../models/Book');


exports.getBooks = async (req, res) => {
  try {
    const targetSearchQueryText = req.query.search;
    let books;
    if (targetSearchQueryText) {
      books = await searchBookByQuery(req.user.id, targetSearchQueryText);  
    } else {
      books = await getAllBooksForUser(req.user.id);
    }
    res.render('mainpage', { 
      books: books,
      pageTitle: "Home",
      path: "/mainpage",
      queryText: targetSearchQueryText
  });
    console.log(books, '-------------------------------------------------');
  } catch (err) {
    console.error(err);
    res.render('mainpage', { 
      books: [],
      pageTitle: "Home",
      path: "/mainpage"
  });
  }
};

exports.getAddForm = async (req, res, next) => {
  try {
    const genres = await getAllBookGenres();
    res.render('addForm', {
      genres: genres, 
      pageTitle: 'Add New Book',
      path: '/new'
    });
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.redirect('/mainpage');
  }
};

exports.addBook = async (req, res) => {
  const { title, author, pages, price, store, purchase_date, picture_url, description, genre } = req.body;

  console.log('raw req.body ', req.body);
  // Retrieve contains data (if any)
  const containsTitles = req.body.contains.title || [];
  const containsAuthors = req.body.contains.author || [];

  // Log each array individually for debugging
  console.log('Contains Titles: ', containsTitles);
  console.log('Contains Authors: ', containsAuthors);

  // Pairing titles and authors
  const contains = containsTitles.map((title, index) => {
    const author = containsAuthors[index];
    if (!title || !author) {
      throw new Error(`Both title and author must be provided for each book pair!`);
    }
    return { title, author };
  });

  console.log('Parsed contains data: ', contains);  // Log the final parsed contains data

  try {
    // Pass the parsed data to your database insertion function
    await create(req.user.id, title, author, pages, price, store, purchase_date, picture_url, description, genre, contains);
    res.redirect('/mainpage');
  } catch (err) {
    console.error(err);
    res.redirect('/mainpage');
  }
};

