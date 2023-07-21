-- Database Schema/Migrations
-- //This file is used to reset the db, using the command npm db:reset as per package.json. The files that run when the command is called in the terminal are: bin/resetdb.js, db/schema, db/seeds


--if running this file for the 1st time firstly run CREATE DATABASE budjet; 
-- delete all tables
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS spending CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS photos CASCADE;

-- create all tables
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(400) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  city VARCHAR(50) NOT NULL,
  created_at TIMESTAMP
);

CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(50) NOT NULL,
  long_description TEXT NOT NULL,
  condition VARCHAR(50),
  thumbnail_url VARCHAR(255),
  owner_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  asking_price INT,
  featured BOOLEAN DEFAULT FALSE,
  sold BOOLEAN DEFAULT FALSE,
  deleted BOOLEAN DEFAULT FALSE,
  date_created TIMESTAMP DEFAULT Now()
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  listing_id INT NOT NULL REFERENCES listings(id) ON DELETE CASCADE
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY NOT NULL,
  listing_id INT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  url VARCHAR(600)
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  message TEXT NOT NULL,
  listing_id INT NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  seller_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT Now()
);
