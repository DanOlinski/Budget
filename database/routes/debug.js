const express = require('express');
const router  = express.Router();
const generalQueries = require('../db/queries/generalQueries');
const sql_inserts = require('../db/inserts/sql_inserts');

//api request to microsoft outlook
router.get('/emailApiRequest', (req, res) => {
  const token = {
    token: "EwCQA8l6BAAUAOyDv0l6PcCVu89kmzvqZmkWABkAAdUp169dAJE9PdLSjXHsJ5C0sWp4uA6Fdy9r7SXbum55lLaZ6Hi0cl2lOv27S15pStAVh/6K0bgjyA+CUjzobgwPtJ/qsboKht2xSIXFWv+x9iWs2JxJ/9lLc5GSzgGhDZPTgtbIRpofB1/6qWHK2GT41XZnp8A29Ihm3bzs0ccfpAG/k+BLBWhKjTkEsZsQEkkrjJR8MUY/ZTbMEPWcnCTITrQMeMYh/h9lCgX7gxa63fLoB9Zrpo6l1hVzC+GhmWG6jc43CLkZYxT970A3yuHDWG/FI9CICi/Ed+JGKn/VxqpCHfCu+3h/dLmQ7HzMtMiO+05lojQuPmy3lj3BMp4DZgAACPZx/fr+2oxBYAILhhMiitK2Y1eSmqA87mE0SVvTkBvX5V5pRGW+ZSuJeNfwavYf/Asm7KxE1d4lfaPc6vuLGmHbLyUH5PatS9yLlztk7EfWaYkVfH1sj47VHsapKWeRGD2dWAZE7DbfS5VzSrZDedpildHzhI1gCIE855v30y4khKQXdtTmh1+gO+vSSuzhZRRUFj4oP/ZkSUxL/cVSfY/jbNKcs+qFfKrDUDwGI7Z7Q374rd1iOHO8ChqDRiwM0aP7OjFQ5A2qMsP+yHOjOkrvFHN2m42LhmVDgaAb9QgPBsofNCVRzK0NmAJfp1c0zDzjvru7bakjTcutvsKiAHx1rKgbmJQTi8xs6Jc8NXiyazLlzMvDRHpznep8UhUZx1tWVWDpN/h5Ka6NNTwQQpmIiR4YNt/t1om9oGfUJedxDRDnj9bssz6fat3q1IzE/CBZ/GTtZR1xn2v99j3hecnG6/yoz42TVqfLmH4AJpSViFQjn6XW4eSHCrpNV2G8R9eZVYRUEQxukZ0cErCcjK6ikmQpCyZX/saALJCtwiLbuM/YOjW4SizCBgRr5KkuuRxJ3qiHg7QEoxeSv5iU7jpuk94IcIXKyOxuvG0Q1XGqmzWlA2y0oW3U3GbcR72fOxIVCT0+npzZq040y8Sa7QKg/xJwdKeIJVNI843MBjFN00HQHFhaYR3RWpenlikB71I0gAGjKIu45dzZ9TZJWNNLz+pCw+Bde3EffIpJaGgkbeao5VAgcDkNWLkG0SdNqPJYIc2Lb860kYk/mJsPCb5Bqclu93FpadtHZNmKB59YBZhB2+GEREXaAKMC"
}
const url = 'https://graph.microsoft.com/v1.0/users/daniel.guterres@hotmail.com'
const fetchAPI = () => {
    return fetch(
      url,
      {
        headers: {
          //this is the authentication
          "Authorization": `Bearer ${token.token}`,
          //this determains the tipe of info I want to fetch
          "Content-Type": "application/json"
        } 
      }
    )
}

  fetchAPI()
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



