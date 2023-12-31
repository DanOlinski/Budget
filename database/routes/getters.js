const express = require('express');
const router  = express.Router();
const generalQueries = require('../db/queries/generalQueries');

router.get('/stores_by_user_id/:id', (req, res) => {

  generalQueries.getStoresByUserId(req.params.id)
  .then(
    (resp) => {
      console.log(resp)
      res.json(resp)
  })
});

//http://localhost:8000/getters/account_info_by_user_id_&_bank/1/Scotiabank
router.get('/account_info_by_user_id_&_bank/:id/:bank', (req, res) => {
  generalQueries.getAccountInfoByUserIdAndBank(req.params.id, req.params.bank)
  .then(
    (resp) => {
      res.json(resp)
    })
  });

//http://localhost:8000/getters/spending
router.post('/spending', (req, res) => {
  let obj = req.body

  // console.log(obj)

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


router.get('/defaultCategory/:id', (req, res) => {
  generalQueries.getDefaultCategoryAndBudgetByUserId(req.params.id)
  .then(
    (resp) => {
      // console.log(resp)
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

router.get('/accounts_by_user/:id', (req, res) => {
  generalQueries.getAccountsInfoByUserId(req.params.id)
  .then(
    (resp) => {
      res.json(resp)
  })
});

//http://localhost:8000/getters/cards_by_account/:id
router.get('/accounts_details_by_user/:id', (req, res) => {
  //check for empty fields

  generalQueries.getAccountDetailsByUser(req.params.id)
  .then((accounts) => {
    // Process accounts data if needed before sending the response
    // For example, convert null card numbers to an empty array

    console.log(accounts, '############')

    const processedAccounts = accounts.map(account => ({
      ...account,
      cards: account.cards || []  // Convert null to an empty array
    }));

    res.json(processedAccounts);
  })
  .catch((error) => {
    console.error("An error occurred:", error.message);
    res.status(500).json({ error: "Internal server error" });
  });
});

module.exports = router;



