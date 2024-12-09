const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

// Books routes
router.get('/mainpage', ensureAuthenticated, bookController.getBooks);
router.get('/mainpage/:genre', ensureAuthenticated, bookController.getBooksByGenre);
router.get('/new', ensureAuthenticated, bookController.getAddForm);
router.post('/new', ensureAuthenticated, bookController.addBook);
router.get('/details/:id', ensureAuthenticated, bookController.getBookById);
router.post('/delete/:id', ensureAuthenticated, bookController.deleteBook);
router.get('/edit/:id', ensureAuthenticated, bookController.getEditForm);
router.post('/edit/:id', ensureAuthenticated, bookController.editBook);

module.exports = router;
