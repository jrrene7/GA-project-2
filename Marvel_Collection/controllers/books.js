const router = require('express').Router();
const auth = require('../services/auth');
const Books = require('../models/books');

router.get('/search', 
		//auth.restrict, 
		//Characters.getCharacters, 
		(request, response) =>{
				response.render('books/index', response.locals.titleData);	
});

router.post('/show', 
		//auth.restrict, 
		Books.getBooks, 
		(request, response) =>{
				console.log(response.locals.titleData);
				// response.send("post");
				response.render('books/show', {books: response.locals.titleData});	
});



module.exports = router;