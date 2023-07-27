const express = require('express');
const router  = express.Router();
const generalQueries = require('../db/queries/generalQueries');
const sql_inserts = require('../db/inserts/sql_inserts');
const fetch = require('node-fetch')
const axios = require('axios');
const qs = require('qs')

//api request to microsoft outlook
router.get('/emailApiRequest', (req, res) => {
  
  const getTokenUrl = 'https://login.microsoft.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a/oauth2/token'
  const getDataUrl = 'https://graph.microsoft.com/v1.0/users/final.project.lhl@outlook.com'
  const headersForTokenRequest = {
  grant_type: 'client_credentials',
  client_id: 'e99c23e3-e715-4f4a-aed5-a2019586b873',
  client_secret: 'wJf8Q~sxP23L.9AV2iscxju~UCGRNZRlffbOQdcr',
  scope: 'https://graph.microsoft.com/.default'
  }
 
  axios.post(
    getTokenUrl,
    qs.stringify(headersForTokenRequest)
  )
  .then((r)=>{
    //console.log(r.data) //this is the object with the token
    const token = r.data.access_token//this token doesn't work for the requested url
    const graphToken = {
    graphToken: 'EwCAA8l6BAAUAOyDv0l6PcCVu89kmzvqZmkWABkAAeEafhb3+xA4jqi0wq7LZvyPhI52uRdUpSMWxnAb6NL7Kh6RcSZAsPbV75qLL19TwFRhEQwZ3hTz8qmbAaF70mo3FcE/igl+yIJeAENgas7UbV6NjyVdO0XLFPtD8vVSZgeLqIt4+/7KjgQcpJgq3hXI2eeJZ938nhOTQr1f27KMsB5uHunmRcUzVEN/nBT5M8c2wERnT/zsxB4PuCyXl5SnKLFkXzxCHr9Npw/r0S99pN8fnircEf3mC7qL+2TUux7qlW5uhWefvr8x0c2YDwMwL4+fGJ/h57BcpKwwkYRDITq5RWQHHXNUXGEK1yCodZPc5/9Vz4Q0VEiXI5gCNlQDZgAACFE78zRw960vUAJjrYUGJGukBEO4wIXRq0U89l6hUrBqoNLmIG8I8kaJtCqMH+6jAV1HB962QzYTYVFw1S+Q/1TiLts3IODmGyUUu3Lsseh4g/8a5CLSYwynic5EgdJjLAa7l5l6+cDWW8Fmrsy7j/KHsxir9iXfv5TrobvX0JIaUsOi/j8mFZWjK6mRIMbD3bwGFDJbqzfWEzY4wDJcjzzKq/Sixuw9acl4J7LMrPG3+xabP9/0J+Mw4om5fVzwgkseH5QyTfu/W8MVmb+4Idc646D85VGYPWSro+XSP2SAOw8trzDYYz16z1sOahuyO9cniMaDo0pnwT7bdH/Wt2wDaiwbb3tq79mqRlREIHRxT8JKGRmO8MqTcIUzM9jHCnusv6SJbvxEL7DygeklriRa5t4cmgzwKuzrOfZtA6m6cd8W5D2UB1SHtGYg7+b0P55O/MScO/l+M+55c7i0m8Xy8Gc99C7HNEmON9HcMdGY131c9uUvpbrkAuWCYiW7+2Nj8c2eeCFxSmYkJGMYsxX/GnDcP6XBQp83wEkUmaR8B9NdJ9KAMj6dPU7GsZIPhUkHQYbqIYxXa2Q7XkphWaz1Dw6FX1DrpzE5n4zQnQ+e2iKjJ9eN/8bh04iyJtB+CXOx8XNrrZ6gqApmg+6d3xhAUXvsiCxZUegrwiB1nW1oCYJPv/3GzeQS6s5O8DPS53ZGeoXZ9Wb2cuUgpr+Zjvl0lZHPfhbacOv3IKjpsUYDiXqwnRE5odQfAjkMqtyb9GCQRKnWaDwrid+nqLuNeTqkgJ+sAYF6SJgimAI=',
    }
    const headersForDataRequest = {
      headers: {
        "Authorization": `Bearer ${graphToken.graphToken}`,
        "Content-Type": "application/json"
      }
    }
    axios.get(
      getDataUrl,
      headersForDataRequest
    )
    .catch((e)=>{
      //console.log("error not desireble")
      return
    })
    .then((r)=>{
      console.log(r.data)
    })
  })
  
  res.json("t")
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



