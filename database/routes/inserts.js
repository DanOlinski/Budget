const express = require('express');
const router  = express.Router();
const generalQueries = require('../db/queries/generalQueries');
const sql_inserts = require('../db/inserts/sql_inserts');
const sql_delete = require('../db/delete/delete');

//for this server to be able to receive incoming data from an API request you need to use express.json in the server setup file: app.use(express.json())
//the following rout saves a new token to the database
router.put("/save_token", (req, res) => {

  let obj = req.body
  //check for empty fields
  if (!obj.user_id || !obj.bank || !obj.token) {
    return res.send({error: 'missing data'})
  }

  sql_inserts.saveToken(obj)
    .then(() => {
      const sendBack = 'successfully saved to db'
      return (res.send(sendBack));
      })
    .catch((error) => {
      return console.log(error.message);
    });
})

//the following rout changes the default category to a new value
router.put("/set_default_category", (req, res) => {

  let obj = req.body
  //check for empty fields
  if (!obj.user_id || !obj.category) {
    return res.send({error: 'missing data'})
  }

  sql_delete.removeDefaultCategory()
    .then((r) => {
      sql_inserts.setDefaultCategoryToTrue(obj.category)
      .then(() => {
        generalQueries.getCategoryIdByCategoryName(obj.category)
        .then(
          (defaultCategoryId) => {
          if(defaultCategoryId === 'not found'){
            return res.json("Category not found")
          }
          sql_inserts.addDefaultCategoryToStores(defaultCategoryId.id)
          .then((r) => {
            generalQueries.getSpendingByUserIdTimeStamp({user_id: obj.user_id, start_date: obj.start_date, end_date: obj.end_date})
            .then((response) => {
              res.json(response)
            })
          })
        })
      })
    })
    .catch((error) => {
      return console.log(error.message);
    });
})

module.exports = router;



