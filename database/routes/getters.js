const express = require('express');
const router  = express.Router();
const generalQueries = require('../db/queries/generalQueries');

router.get('/stores_by_user_id/:id', (req, res) => {

  generalQueries.getStoresByUserId(req.params.id)
  .then(
    (resp) => {
      res.json(resp)
  })
});

//http://localhost:8000/getters/account_info_by_user_id_&_bank/1/Scotiabank
router.get('/account_info_by_user_id_&_bank/:id/:bank', (req, res) => {
  generalQueries.getAccountInfoByUserId(req.params.id, req.params.bank)
  .then(
    (resp) => {
      res.json(resp)
    })
  });
  
//http://localhost:8000/getters/spending
router.post('/spending', (req, res) => {
  let obj = req.body
  
  generalQueries.getSpendingWithDefaultCategory(obj)
  .then((SpendingWithDefaultCategory) => {
    generalQueries.getSpendingWithSetCategory(obj)
    .then((SpendingWithSetCategory) => {
      const response = {for_selected_categories: SpendingWithSetCategory, for_default_category: SpendingWithDefaultCategory}
      res.json(response)
    }) 
  })
})

router.get('/categories/:id', (req, res) => {
  generalQueries.getCategoriesByUserId(req.params.id)
  .then(
    (resp) => {
      res.json(resp)
  })
});

//http://localhost:8000/getters/budget_limits/:id
router.get('/budget_limits/:id', (req, res) => {

  generalQueries.getBudgetById(req.params.id)
  .then(
    (resp) => {
      res.json(resp)
  })

});

module.exports = router;



