const express = require('express');
const router  = express.Router();
const generalQueries = require('../db/queries/generalQueries');
const sql_inserts = require('../db/inserts/sql_inserts');
const sql_delete = require('../db/delete/sql_delete');

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

  sql_delete.removeDefaultCategory(obj.user_id)
    .then((r) => {
      sql_inserts.setDefaultCategoryToTrue(obj.category, obj.user_id)
      .then(() => {
        //this is to check if category exist's in database
        generalQueries.getCategoryByName(obj.category, obj.user_id)
        .then(
          (defaultCategoryId) => {
          if(defaultCategoryId === 'not found'){
            return res.json("Category not found")
          }
          sql_inserts.addDefaultCategoryToStores(obj.category, obj.user_id)
          .then((r) => {

            generalQueries.getSpendingWithDefaultCategory(obj)
            .then((SpendingWithDefaultCategory) => {
              generalQueries.getSpendingWithSetCategory(obj)
              .then((SpendingWithSetCategory) => {
                const response = {for_selected_categories: SpendingWithSetCategory, for_default_category: SpendingWithDefaultCategory}
                res.json(response)
              }) 
            })

          })
        })
      })
    })
    .catch((error) => {
      return console.log(error.message);
    });
})

router.put('/set_budget_limit', (req, res) => {
  let obj = req.body
  console.log(obj)

  sql_inserts.setBudgetLimit(obj)
  .then(
    () => {
      generalQueries.getBudgetById(obj.user_id)
      .then(
      (resp) => {
      res.json(resp)
    })
  })
  .catch((e) => console.log(e.message))
});

router.put("/new_category", (req, res) => {

  let obj = req.body
  //check for empty fields
  if (!obj.user_id || !obj.category) {
    return res.send({error: 'missing data'})
  }

  //check if category already exists
  generalQueries.getCategoryByName(obj.category, obj.user_id)
  .then((r) => {
      if(r === 'not found'){
        sql_inserts.createNewCategory(obj)
        .then(() => {
          generalQueries.getCategoriesByUserId(obj.user_id)
          .then((response) => {
            return res.json(response)
          })
        })
        .catch((error) => {
          return console.log(error.message);
        });
      }else{res.json("Category already exists")}
    })
})

router.put("/assign_category_to_spending", (req, res) => {

  let obj = req.body
  //check for empty fields
  if (!obj.user_id || !obj.category || !obj.store_name) {
    return res.send({error: 'missing data'})
  }

  sql_inserts.assignCategoryToSpending(obj)
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

router.put("/new_account", (req, res) => {

  let obj = req.body
  //check for empty fields
  if (!obj.user_id || !obj.token || !obj.folder_url || !obj.bank) {
    return res.send({error: 'missing data'})
  }

  generalQueries.getAccountInfoByUserId(obj.user_id, obj.bank)
  .then((r) => {
    if(r === 'not found'){
      sql_inserts.createNewAccount(obj)
      .then(() => {
        generalQueries.getAccountInfoByUserId(obj.user_id, obj.bank)
        .then((resp)=>{
          return res.json(resp)
        })
      })
    }else{return res.json("Bank already registered")}
  })
})
module.exports = router;



