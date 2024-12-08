const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

// Books routes
router.get('/mainpage', ensureAuthenticated, bookController.getBooks);
router.get('/mainpage/:genre', ensureAuthenticated, bookController.getBooksByGenre);
router.get('/new', bookController.getAddForm);
router.post('/new', ensureAuthenticated, bookController.addBook);
router.get('/details/:id', bookController.getBookById);
router.post('/delete/:id', bookController.deleteBook);
router.get('/edit/:id', bookController.getEditForm);
router.post('/edit/:id', bookController.editBook);

module.exports = router;
