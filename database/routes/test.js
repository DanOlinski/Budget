
const express = require('express');
const router  = express.Router();


router.get('/', (req, res) => {
  res.render('test.ejs');
});

router.post('/', (req, res) => {
  console.log("api rout", req.body)//this is for debugging
  res.json(req.body)//this is used by jquery to use the information
})

module.exports = router;
