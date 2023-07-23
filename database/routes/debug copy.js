const express = require('express');
const router  = express.Router();
const routHelpers = require('./routHelpers');
const generalQueries = require('../db/queries/generalQueries');
const sql_inserts = require('../db/inserts/sql_inserts');

//api request to microsoft outlook
router.get('/emailApiRequest', (req, res) => {
  routHelpers.fetchAPI()
    .then((resp) => {
      //the API response is a messy object, so you need to use .json to pull useful data only.
      resp.json()
      .then(
        (response) => {
          //here where the info is rendered to the page
          res.json(response)
      })
    })
});

//find user by id; http://localhost:8000/debug/queryGetRequest/1
router.get('/queryGetRequest/:id', (req, res) => {
  //commented out, below is the most basic way of displaying data to the browser, the displayed data can be used as data when there is an API request from a remote server
  //res.json("response on browser")
  
  generalQueries.debugQuery(req.params.id)
  .then(
    (resp) => {
      res.json(resp)
  })
});

//for this server to be able to receive incoming data from an API request you need to use express.json in the server setup file: app.use(express.json())
//the following rout creates a new user, adding the info to the database
router.put("/queryPutRequest", (req, res) => {
  let newUser = req.body
  //check for empty fields
  if (!newUser.email || !newUser.hashedPassword) {
    return res.send({error: 'empty field(s)'})
  }

  //check if passed in email is already in the db
  generalQueries.getUserByEmail(newUser.email)
    .then(checkUser => {
      //check if user exists
      if (checkUser !== "not found") {
        return res.send({error: 'user already registered'});
      }
      //if user does not exist add user to the db, add a cookie with user's encrypted email then redirect to home page
      sql_inserts.saveUserToDb(newUser);
      return res.send('user successfully saved to db');
    })
    .catch((error) => {
      return console.log(error.message);
    });
})

module.exports = router;



