-- Database Schema/Migrations
-- //This file is used to reset the db, using the command npm run db:reset as per package.json. The files that run when the command is called in the terminal are: bin/resetdb.js, db/schema, db/seeds

--Before running npm run db:reset you need to manually create the database(CREATE DATABASE budget), this can't be done automatically(not that I know of) for safety reasons(avoid a user from using DROP DATABASE from within a code)
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS spending CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS cards CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- create all tables
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(400) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  bank VARCHAR(100),
  holdings VARCHAR(255),
  token VARCHAR(255),
  folder_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE cards (
  id SERIAL PRIMARY KEY NOT NULL,
  account_id INT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  card_number VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(100),
  budget VARCHAR(255),
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE spending (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE, --I need this for assignCategoryToSpending function. not managing to perform a UPDATE with a JOIN
  default_category VARCHAR(100) DEFAULT 'Miscellaneous', --category name
  selected_category VARCHAR(100) DEFAULT NULL, --category name
  account_id INT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  subject VARCHAR(100),
  amount_spent VARCHAR(255),
  store_name VARCHAR(255),
  created_at_parsed VARCHAR(100),--this date is expected to be parsed from ISO format so that I can display in the front end items that are within a time frame (this is set by the user in the front end). This time is parsed from incoming emails "received date"
  created_at TIMESTAMP DEFAULT NOW()
);