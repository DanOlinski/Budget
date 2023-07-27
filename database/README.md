# Database server
 This server holds the data that is displayed in the app, it is served separately from the client interface

## Setup
1. Install server dependencies using the `npm install` command from scheduler-api-server directory.
2. Create the database by following instructions below under "Create the DB" section 
3. Start the web server using the `npm start` command. The app will be served at <http://localhost:8000/>. To run using nodemon use: `npm run local`

## Create the DB
1. start postgres with the command `startpostgres`
2. Create a database with the command `CREATE DATABASE budget;`.
3. run the command `npm run db:reset` to create the tables and insert data. This command is also used to reset the database

## Access the DB through API requests
1. A suggestion for what module to use when getting and putting data to and from the db is the axios module. Install: `npm i axios@0.2.0`, require: `const axios = require('axios');`
2. In the main server's .env file, place the following: `DB_PROXY_URL=http://localhost:8000`(if you are using react or a web socket the proxy method as a bit different). 
  Then in the file where you are going to set up an API request, require the DB_PROXY_URL from .env file as such: `require('dotenv').config()`, then save it to a variable: `const dbProxy = process.env.DB_PROXY_URL`. Now you can reference the url like so: `${dbProxy}/<whateverRoutYouDesire>`
  This will enable you to make API requests to the db server without exposing the entire url (hiding the location of your db). In this construction your database is a bit hidden but not fully protected from attacks, the correct way of protecting it would be to add an authentication barrier for every API request.
3. Axios get request:
  //constructors
  const proxy = process.env.DB_PROXY_URL
  const url = `${proxy}/debug/queryRequest`

  //create the axios request
  const axiosGetRequest = () => {return axios.get(url)}

  //call the axios get request
  axiosGetRequest()
  .then((resp) => {
    console.log(resp.data)//to check response status
    return resp.data
  })

4. Axios put request:
  //create the axios put request
  const axiosPutRequest = () => {
  //to save a new user: object = {email: "...", hashedPassword: "..."}
  return axios.put(url, object)
  }

  //call the axios request
  axiosPutRequest()
    .then((resp) => {
    console.log(resp.data)//to check response status
    return resp.data
  })

## routs with data

  # Save new user to database
  - rout: `/user/create`
  - API method: put
  - expected object from API request: {email: "...", hashedPassword: "..."}
  - response from bd server: user id and user email (to be saved as cookies)

  # Get a user's password(hashed), send user's email as a parameter
  - rout: `/user/password/:email`
  - API method: get
  - expected parameter in url: user's email
  - response from bd server: user's password

  # Get stores visited by a user
  - rout: `/stores-by-user-id/:id`
  - API method: get
  - expected parameter in url: user id
  - response from bd server: all stores visited by user

  # Get spending
  - rout: `/spending-by-user-id/:id`
  - API method: get
  - expected parameter in url: user id
  - response from bd server: all spending from user

  # Get account info
  - rout: `/account-info-by-user-id-&-account/:id/:account_number`
  - API method: get
  - expected parameter in url: user id and account number(same as what is in email coming from the bank)
  - response from bd server: account info

