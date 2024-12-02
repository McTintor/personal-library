const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

const PORT = process.env.PORT || 3005;

app.set('view engine', 'ejs');
app.set('views', 'views');

const indexRoutes = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRoutes);

app.use(errorController.get404);

app.listen(PORT);