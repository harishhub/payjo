const express = require('express');
const router = express.Router();


/* GET List Product page. */
router.get('/', function(req, res, next) {
	
	res.render('');
});

/* GET Product Add page. */
router.get('/add-product', function(req, res, next) {
	
	res.render('addProduct');
});

module.exports = router;


