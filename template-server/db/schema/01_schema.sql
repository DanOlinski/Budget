-- Database Schema/Migrations
-- //This file is used to reset the db, using the command npm run db:reset as per package.json. The files that run when the command is called in the terminal are: bin/resetdb.js, db/schema, db/seeds

--Before running npm run db:reset you need to manually create the database(CREATE DATABASE budget), this can't be done automatically(not that I know of) for safety reasons(avoid a user from using DROP DATABASE from within a code)
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS spending CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;

-- create all tables
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(400) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE spending (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  bank VARCHAR(100),
  account_number VARCHAR(255),
  subject VARCHAR(100),
  monetary_value VARCHAR(255),
  store_name VARCHAR(255),
  received_date TIMESTAMP DEFAULT Now()
);

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  bank VARCHAR(100),
  account_number VARCHAR(255),
  holdings VARCHAR(255),
  received_date TIMESTAMP DEFAULT Now()
);
