const axios = require('axios');
const db = require('../db/config');


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
};

// Books.saveSeach = (request, response, next) => {
// 	 const book = request.body.data.results;
// 	db.one( 'INSERT INTO user_books (user_id, book_id, book) VALUES ($1, $2, $3) RETURNING *', 
// 		[request.users.id, request.Books.id, book])
// 	.then((bookData) => {
// 		response.locals.bookData = bookData;
// 		console.log(bookData);
// 		next();
// 	})
// };


//worked with GAINOR
Books.saveSearch = (book, user_id) => {
	console.log('====>', book)
	 const {title, description, thumbnail} = book;
	// const character = request.body.data.results;
	return db.one('INSERT INTO books (title, description, thumbnail, user_id) VALUES ($1, $2, $3, $4) RETURNING *', 
		[title, description, thumbnail, user_id])
	// .then(() => {
	// 	// response.locals.characterData = characterData;
	// 	// console.log(characterData);
	// 	next();
	// })
};

Books.getFavorites = (user_id) => {
	return db.any(`SELECT * FROM books WHERE user_id = $1`, user_id);
}

// Books.updateFavorite = (req, res, next) => {
//   const {user_id, book_id} = res.locals.userBooks;
//   const {id} = req.params;
//   db.oneOrNone(`UPDATE user_books SET
//     user_id = $1, book_id = $2
//     WHERE id = $3 RETURNING *`,
//     [user_id, book_id, id])
//     .then(userBook => {
//       res.locals.userBook = userBook;
//       next();
//     })
//     .catch(err => console.log(err));
// };

Books.deleteFavorite = (request, response, next) => {
  const {user_id} = request.params;
  db.none(`DELETE FROM books WHERE user_id = $1`, user_id)
  .then(()=> next())
  .catch(err => console.log(err));
};







module.exports = Books;