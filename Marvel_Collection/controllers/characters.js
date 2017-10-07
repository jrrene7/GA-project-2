const router = require('express').Router();
const auth = require('../services/auth');
const Characters = require('../models/characters');


router.get('/search', 
		//auth.restrict, 
		//Characters.getCharacters, 
		(request, response) =>{
				response.render('characters/index', response.locals.nameData);	
});

router.post('/show', 
		//auth.restrict, 
		Characters.getCharacters, 
		(request, response) =>{
				console.log(response.locals.nameData);
				// response.send("post");
				response.render('characters/show', {characters: response.locals.nameData});	
});

router.post('/home', (request, response) => {
	console.log('====>', request.user.id)
     Characters.saveSearch({
     	name: request.body.name, 
     	description: request.body.description, 
     	thumbnail: request.body.thumbnail}, request.user.id)
     .then(response.redirect('/characters/home'))
  });

router.get('/home', (request, response) => {
	     	Characters.getFavorites(request.user.id)
     	.then((characters) => {
     		    response.render('home', {characters});
     	})
})


// router.delete('/:id',
//   Characters.deletefavorite,
//   (req, res) => {
//     res.send('deleted');
//   });


module.exports = router;