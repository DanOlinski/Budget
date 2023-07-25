const express = require('express');
const router  = express.Router();
const generalQueries = require('../db/queries/generalQueries');

router.get('/stores-by-user-id/:id', (req, res) => {

  generalQueries.getStoresByUserId(req.params.id)
  .then(
    (resp) => {
      res.json(resp)
  })
});

router.get('/spending-by-user-id/:id', (req, res) => {

  generalQueries.getSpendingByUserId(req.params.id)
  .then(
    (resp) => {
      res.json(resp)
  })
});

//http://localhost:8000/getters/account-info-by-user-id-&-account/1/*****08*7728
router.get('/account-info-by-user-id-&-account/:id/:account_number', (req, res) => {
  generalQueries.getAccountInfoByUserId(req.params.id, req.params.account_number)
  .then(
    (resp) => {
      res.json(resp)
  })
});

module.exports = router;



