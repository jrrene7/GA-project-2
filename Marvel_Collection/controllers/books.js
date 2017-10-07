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


router.post('/home', (request, response) => {
	console.log('====>', request.user.id)
     Books.saveSearch({
     	title: request.body.title, 
     	description: request.body.description, 
     	thumbnail: request.body.thumbnail}, request.user.id)
     .then(response.redirect('/books/home'))
  });

router.get('/home', (request, response) => {
	     	Books.getFavorites(request.user.id)
     	.then((books) => {
     		    response.render('home', {books});
     	})
})

// router.put('/home',
//   Books.updateFavorite,
//   (req, res) => {
//     const {userBook} = res.locals;
//     res.json({userBook});
//   });

// router.delete('/:id',
//   Books.deleteFavorite,
//   (req, res) => {
//     res.send('deleted');
//   });


module.exports = router;