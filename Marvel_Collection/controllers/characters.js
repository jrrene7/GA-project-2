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

// router.post('/')

module.exports = router;