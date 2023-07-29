const express = require('express');
const router  = express.Router();
const generalQueries = require('../db/queries/generalQueries');
const sql_inserts = require('../db/inserts/sql_inserts');
const sql_delete = require('../db/delete/sql_delete');

//for this server to be able to receive incoming data from an API request you need to use express.json in the server setup file: app.use(express.json())
//the following rout saves a new token to the database
router.put("/category", (req, res) => {

  let obj = req.body
  //check for empty fields
  if (!obj.user_id || !obj.category) {
    return res.send({error: 'missing data'})
  }

  sql_delete.deleteCategory(obj)
    .then((resp) => {
      if(resp === "info removed from database"){
        generalQueries.getCategoriesByUserId(obj.user_id)
        .then((resp) => {
          return res.send(resp);
        })
      }
        else{res.send('operation not successful')}
      })
    .catch((error) => {
      return console.log(error.message);
    });
})

router.put("/remove_category_from_spending", (req, res) => {

  let obj = req.body
  //check for empty fields
  if (!obj.user_id || !obj.store_name || !obj.start_date || !obj.end_date) {
    return res.send({error: 'missing data'})
  }

  sql_delete.removeCategoryFromSpending(obj)
  .then(() => {
    generalQueries.getSpendingWithDefaultCategory(obj)
    .then((SpendingWithDefaultCategory) => {
      generalQueries.getSpendingWithSetCategory(obj)
      .then((SpendingWithSetCategory) => {
        const response = {for_selected_categories: SpendingWithSetCategory, for_default_category: SpendingWithDefaultCategory}
        res.json(response)
      })
      .catch((e)=>console.log(e.message)) 
    })
  })
})

module.exports = router;



