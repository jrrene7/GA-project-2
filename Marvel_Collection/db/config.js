const pgp = require('pg-promise')();

const connectionSettings = {
  host: 'localhost',
  port: 5432,
  database: 'marvel_companion',
  user: 'Jean-Robert'
}

const db = pgp(connectionSettings);
module.exports = db;