const express = require('express');
const router  = express.Router();
const generalQueries = require('../db/queries/generalQueries');
const sql_inserts = require('../db/inserts/sql_inserts');

//find user by id; http://localhost:8000/debug/queryGetRequest/1
router.get('/password/:email', (req, res) => {
  
  generalQueries.getPasswordByEmail(req.params.email)
  .then(
    (resp) => {
      res.json(resp)
  })
});

//for this server to be able to receive incoming data from an API request you need to use express.json in the server setup file: app.use(express.json())
//the following rout creates a new user, adding the info to the database
router.put("/create", (req, res) => {
  let newUser = req.body
  //check for empty fields
  if (!newUser.email || !newUser.password) {
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
      generalQueries.getUserByEmail(newUser.email)
      .then((response) => {
        const message = 'user successfully saved to db'
        const sendBack = {reassuringMessage: message, userId: response[0].id, userEmail: response[0].email}
        return (res.send(sendBack));
      })
    })
    .catch((error) => {
      return console.log(error.message);
    });
})


module.exports = router;



