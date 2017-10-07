
DROP DATABASE marvel_companion;
CREATE DATABASE marvel_companion;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS user_books;
DROP TABLE IF EXISTS user_characters;

\c marvel_companion;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL,
  thread_id VARCHAR NOT NULL
);

CREATE TABLE characters (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  description VARCHAR,
  thumbnail VARCHAR,
  user_id INTEGER
);


CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  thumbnail VARCHAR,
  description VARCHAR,
	price INTEGER
);

CREATE TABLE user_books (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	book_id INTEGER REFERENCES books(id)
	);

CREATE TABLE user_characters (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	characters_id INTEGER REFERENCES characters(id)
	);

