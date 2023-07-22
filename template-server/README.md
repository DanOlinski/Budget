# Template server
 This is a template server with a database. It is a work in progress so files within directories (public, routes, styles, views are quite messy still)

## Setup
1. Install server dependencies using the `npm install` command from scheduler-api-server directory.
2. Create the database by following instructions below under "Create the DB" section 
3. Start the web server using the `npm start` command. The app will be served at <http://localhost:8080/>. To run using nodemon use: `npm run local`

## Create the DB
1. start postgres with the command `startpostgres`
2. Create a database with the command `CREATE DATABASE <whatever database name you want>;` (be sure to match the database name in the .env file).
3. run the command `npm run db:reset` to create the tables and insert data. This command is also used to reset the database

