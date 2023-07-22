
const express = require('express');
const router  = express.Router();
const routHelpers = require('./routHelpers');

router.get('/', (req, res) => {
  //res.render("test")
  
  routHelpers.fetchAPI()
    .then((resp) => {
      //the API response is a messy object, so you need to use .json to pull useful data only.
      resp.json()
      .then(
        (response) => {
          //here where the info is rendered to the page
          res.json(response)
        }
      )
    })
});

router.post('/', (req, res) => {
  console.log("api rout", req.body)//this is for debugging
  res.json(req.body)//this is used by jquery to use the information
})

module.exports = router;
