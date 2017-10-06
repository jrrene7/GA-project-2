const axios = require('axios');

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

// Characters.save = (request, response, next) => {
// 	// const id = request.params.id;
// 	db.manyOrnone( 'INSERT INTO characters (name, description, thumbnail) VALUES ($1, $2, $3) RETURNING *', 
// 		[name, description, thumbnail])
// 	.then((characterData) => {
// 		response.locals.characterData = characterData;
// 		console.log(characterData);
// 		next();
// 	})
// };
// }




module.exports = Characters;