const axios = require('axios');
const db = require('../db/config');


const TS = process.env.TS;
const API_KEY = process.env.API_KEY;
const HASH = process.env.HASH;

const Characters = {}

Characters.getCharacters = (request, response, next) => {
	const name = request.body.input;
	console.log('search input: ' + name);
	const urlStr = `https://gateway.marvel.com:443/v1/public/characters?name=${name}&ts=${TS}&apikey=${API_KEY}&hash=${HASH}`;
	console.log(urlStr);
	axios.get(`https://gateway.marvel.com:443/v1/public/characters?name=${name}&ts=${TS}&apikey=${API_KEY}&hash=${HASH}`)
	.then( nameData => {
		response.locals.nameData = nameData.data.data.results;
		next();
	}).catch( err => {
		console.error(`ERROR IN RETRIEVING NAME: ${err}`)
	})
}

Characters.saveSearch = (character, user_id) => {
	console.log('====>', character)
	 const {name, description, thumbnail} = character;
	// const character = request.body.data.results;
	return db.one('INSERT INTO characters (name, description, thumbnail, user_id) VALUES ($1, $2, $3, $4) RETURNING *', 
		[name, description, thumbnail, user_id])
	// .then(() => {
	// 	// response.locals.characterData = characterData;
	// 	// console.log(characterData);
	// 	next();
	// })
};

Characters.getFavorites = (user_id) => {
	return db.any(`SELECT * FROM characters WHERE user_id = $1`, user_id);
}

Characters.updateFavorite = (req, res, next) => {
  const {user_id, character_id} = res.locals.userCharacter;
  const {id} = req.params;
  db.oneOrNone(`UPDATE user_characters SET
    user_id = $1, character_id = $2
    WHERE id = $3 RETURNING *`,
    [user_id, character_id, id])
    .then(userCharacter => {
      res.locals.userCharacter = userCharacter;
      next();
    })
    .catch(err => console.log(err));
   };

Characters.deleteFavorite = (req, res, next) => {
  const {id} = req.params;
  db.none('DELETE FROM user_characters WHERE id = $1', [id])
  .then(()=> next())
  .catch(err => console.log(err));
}



module.exports = Characters;