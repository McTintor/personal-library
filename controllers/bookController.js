const { create, getAllBooksForUser, searchBookByQuery, getAllBookGenres, getAllBooksByGenre } = require('../models/Book');


exports.getBooks = async (req, res) => {
  try {
    const genres = await getAllBookGenres();
    const targetSearchQueryText = req.query.search;
    let books;
    if (targetSearchQueryText) {
      books = await searchBookByQuery(req.user.id, targetSearchQueryText);  
    } else {
      books = await getAllBooksForUser(req.user.id);
    }

    const booksPerPage = 15;
    const page = req.query.page || 1;
    const totalPages = Math.ceil(books.length / booksPerPage);
    books = books.slice((page - 1) * booksPerPage, page * booksPerPage);

    res.render('mainpage', { 
      books: books,
      pageTitle: "Home",
      path: "/mainpage",
      queryText: targetSearchQueryText,
      totalPages: totalPages,
      currentPage: page,
      genres,
      genre: ''
  });
    console.log(books, '-------------------------------------------------');
  } catch (err) {
    console.error(err);
    res.redirect('/mainpage');
  }
};

exports.getBooksByGenre = async (req, res) => {
  try {
    const genres = await getAllBookGenres();

    const genre = req.params.genre;
    let books = await getAllBooksByGenre(req.user.id, genre);

    const booksPerPage = 15;
    const page = req.query.page || 1;
    const totalPages = Math.ceil(books.length / booksPerPage);
    books = books.slice((page - 1) * booksPerPage, page * booksPerPage);

    res.render('mainpage', {
      books,
      pageTitle: 'Home',
      path: "/mainpage",
      queryText: '',
      totalPages,
      currentPage: page,
      genres,
      genre
    })
  }
  catch (err) {
    console.error(err);
    res.redirect('/mainpage');
  }
}

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

