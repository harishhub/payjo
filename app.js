const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const index = require('./routes/index');
const product = require('./routes/product');

mongoose.connect('mongodb://localhost/payjo')
	.then(() => {
		console.log("database connected")
	})
	.catch((error) => {

	})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/product', product);

app.use(function(req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
  
  // render the error page
  res.status(err.status || 500);
  
  //res.render('error');
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = app;