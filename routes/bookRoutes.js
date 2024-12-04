const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

// Books routes
router.get('/mainpage', ensureAuthenticated, bookController.getBooks);
router.get('/new', bookController.getAddForm);
router.post('/new', ensureAuthenticated, bookController.addBook);

module.exports = router;
