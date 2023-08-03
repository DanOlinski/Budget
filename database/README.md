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
2. Setting up proxy rout
- React server: When using axios in a React server any axios request done with a complete url (ex: `http://localhost:8000`) will not work, React and axios block you from exposing a url through API request. To make this work go to the package.json file and paste the following key at the end of the package.json main object: `"proxy": "http://localhost:8001"` 
- Express server: In the main server's .env file, place the following: `DB_PROXY_URL=http://localhost:8000`(if you are using react or a web socket the proxy method as a bit different). 
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

  # Get a user's password, send user's email as a parameter
  - rout: `/user/:password/:email`
  - API method: get
  - expected parameter in url: user's email
  - response from bd server: user's password

  # Get stores visited by user id
  - rout: `/getters/stores_by_user_id/:id`
  - API method: get
  - expected parameter in url: user id
  - response from bd server: all stores visited by user

  # Get categories by user id
  - rout: `/getters/categories/:id`
  - API method: get
  - expected parameter in url: user id
  - response from bd server: all category info belonging to a user
  
  # Get spending
  - rout: `/getters/spending`
  - API method: post
  - expected object: {user_id, start_date, end_date} dates must be in ISO format
  - response from bd server: all spending  { for_selected_categories: [...], for_default_category:[...] }

  # Get account info
  - rout: `/getters/account_info_by_user_id_&_bank/:id/:bank`
  - API method: get
  - expected parameter in url: user id and bank name
  - response from bd server: account info

  # Get all accounts belonging to a user
  - rout: `/getters/accounts_by_user/:id`
  - API method: get
  - expected parameter in url: user id
  - response from bd server: accounts info

  # Save Token
  - rout: `/inserts/save_token`
  - API method: put
  - expected object: {user_id: "..", bank: '...', token: "..."}
  token comes from microsoft graphs
  - response from bd server: account info

  # Set New Default Category
  - rout: `/inserts/set_default_category`
  - API method: put
  - expected object: {user_id, category, start_date, end_date}
  - response from bd server: { for_selected_categories: [...], for_default_category:[...] }

   # Get budget limits
  - rout: `/getters/budget_limits/:id`
  - API method: get
  - expected parameter in url: {user_id, bank}
  - response from bd server: all categories with budget limits

  # Set Budget Limit
  - rout: `/inserts/set_budget_limit`
  - API method: put
  - expected object: {user_id, category, budget_limit}
  - response from bd server: all updated categories with budget limits

  # Delete a Category
  - rout: `/delete/category`
  - API method: put
  - expected object from API request: {user_id, category}
  - response from bd server: responds with all categories

  # Create New Category
  - rout: `/inserts/new_category`
  - API method: put
  - expected object from API request: {user_id, category}
  - response from bd server: responds with all categories

  # Set a category to a store
  - rout: `/inserts/assign_category_to_spending`
  - API method: put
  - expected object from API request: {user_id, category, store_name, start_date, end_date}
  - response from bd server: all spending { for_selected_categories: [...], for_default_category:[...] }

   # Remove category from spending
  - rout: `/inserts/remove_category_from_spending`
  - API method: put
  - expected object from API request: {user_id, store_name, start_date, end_date}
  - response from bd server: all spending { for_selected_categories: [...], for_default_category:[...] }

  # Create New Account
  - rout: `/inserts/new_account`
  - API method: put
  - expected object from API request: {user_id, token, folder_url, bank}
  - response from bd server: info for created account

  # Create Download Emails
  - rout: `/inserts/download_emails`
  - API method: put
  - expected object from API request: {user_id, token, bank, start_date, end_date}
  - response from bd server: info for created account