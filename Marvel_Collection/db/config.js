const pgp = require('pg-promise')();

const connectionSettings = {
  host: 'localhost',
  port: 5432,
  database: 'marvel_companion',
  user: 'Jean-Robert'
}

const db = pgp(process.env.DATABASE_URL || connectionSettings);

// const db = pgp(connectionSettings);
module.exports = db;