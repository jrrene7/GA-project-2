const axios = require('axios');

const TS = process.env.TS;
const API_KEY = process.env.API_KEY;
const HASH = process.env.HASH;

const Books = {}

Books.getBooks = (request, response, next) => {
	const title = request.body.input;
	const urlStr = `https://gateway.marvel.com:443/v1/public/comics?dateDescriptor=thisMonth&titleStartsWith=${title}&limit=20&ts=${TS}&apikey=${API_KEY}&hash=${HASH}`;
	console.log(urlStr);
	axios.get(`https://gateway.marvel.com:443/v1/public/comics?dateDescriptor=thisMonth&titleStartsWith=${title}&limit=20&ts=${TS}&apikey=${API_KEY}&hash=${HASH}`)
	.then( titleData => {
		response.locals.titleData = titleData.data.data.results;
		next()
	}).catch( err => {
		console.error(`ERROR IN RETRIEVING TITLE: ${err}`)
	})
}

module.exports = Books;