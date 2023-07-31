const express = require('express');
const router = express.Router();
const generalQueries = require('../db/queries/generalQueries');
const sql_inserts = require('../db/inserts/sql_inserts');
const sql_delete = require('../db/delete/sql_delete');
const axios = require('axios');
const helpers = require('../routes/helpers')

//for this server to be able to receive incoming data from an API request you need to use express.json in the server setup file: app.use(express.json())
//the following rout saves a new token to the database
router.put("/save_token", (req, res) => {

  let obj = req.body
  //check for empty fields
  if (!obj.user_id || !obj.bank || !obj.token) {
    return res.send({ error: 'missing data' })
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
    return res.send({ error: 'missing data' })
  }

  sql_delete.removeDefaultCategory(obj.user_id)
    .then((r) => {
      sql_inserts.setDefaultCategoryToTrue(obj.category, obj.user_id)
        .then(() => {
          //this is to check if category exist's in database
          generalQueries.getCategoryByName(obj.category, obj.user_id)
            .then(
              (defaultCategoryId) => {
                if (defaultCategoryId === 'not found') {
                  return res.json("Category not found")
                }
                sql_inserts.addDefaultCategoryToStores(obj.category, obj.user_id)
                  .then((r) => {

                    generalQueries.getSpendingWithDefaultCategory(obj)
                      .then((SpendingWithDefaultCategory) => {
                        generalQueries.getSpendingWithSetCategory(obj)
                          .then((SpendingWithSetCategory) => {
                            const response = { for_selected_categories: SpendingWithSetCategory, for_default_category: SpendingWithDefaultCategory }
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
    return res.send({ error: 'missing data' })
  }

  //check if category already exists
  generalQueries.getCategoryByName(obj.category, obj.user_id)
    .then((r) => {
      if (r === 'not found') {
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
      } else { res.json("Category already exists") }
    })
})

router.put("/assign_category_to_spending", (req, res) => {

  let obj = req.body
  //check for empty fields
  if (!obj.user_id || !obj.category || !obj.store_name) {
    return res.send({ error: 'missing data' })
  }

  sql_inserts.assignCategoryToSpending(obj)
    .then(() => {
      generalQueries.getSpendingWithDefaultCategory(obj)
        .then((SpendingWithDefaultCategory) => {
          generalQueries.getSpendingWithSetCategory(obj)
            .then((SpendingWithSetCategory) => {
              const response = { for_selected_categories: SpendingWithSetCategory, for_default_category: SpendingWithDefaultCategory }
              res.json(response)
            })
            .catch((e) => console.log(e.message))
        })
    })
})

router.put("/new_account", (req, res) => {

  let obj = req.body
  //check for empty fields
  if (!obj.user_id || !obj.token || !obj.folder_url || !obj.bank) {
    return res.send({ error: 'missing data' })
  }

  generalQueries.getAccountInfoByUserIdAndBank(obj.user_id, obj.bank)
    .then((r) => {
      if (r === 'not found') {
        sql_inserts.createNewAccount(obj)
          .then((r) => {
            console.log(r)
            generalQueries.getAccountInfoByUserIdAndBank(obj.user_id, obj.bank)
              .then((resp) => {
                return res.json(resp)
              })
          })
      } else { return res.json("Bank already registered") }
    })
})

router.put("/download_emails", (req, res) => {

  let obj = req.body
  //check for empty fields
  if (!obj.user_id || !obj.token || !obj.bank || !obj.start_date || !obj.end_date) {
    return res.send({ error: 'missing data' })
  }

  //add info in obj from db for API request
  obj.endUrlForFolderLength = '/totalItemCount'
  obj.endUrlForDataRequest = '/messages?%24top='
  obj.authentication = {
    headers: {
      "Authorization": `bearer ${obj.token}`
    }
  }

  generalQueries.getAccountInfoByUserIdAndBank(obj.user_id, obj.bank)
    .then((accountInfo) => {
      //add info in obj from db for API request
      obj.folder_url = accountInfo[0].folder_url
      obj.account_id = accountInfo[0].id

      //build API request and extract data from emails
      //const emailMessagesRequest = (obj) => {
      //request for the folder length
      const getFolderLengthUrl = `${obj.folder_url}${obj.endUrlForFolderLength}`

      axios.get(getFolderLengthUrl, obj.authentication)
        .then((axiosFolderLengthResp) => {
          const folderLength = axiosFolderLengthResp.data.value
          const dataRequestUrl = `${obj.folder_url}${obj.endUrlForDataRequest}${folderLength}`

          axios.get(dataRequestUrl, obj.authentication)
            .then((axiosDataResp) => {
              const emails = axiosDataResp.data.value

              //loop through all incoming emails
              //level of nested loops is 1
              for (let email of emails) {

                //check last updated email. Prevent from adding duplicate values to db
                generalQueries.getLastSpendingAddedToDbByDate(obj.user_id)
                  .then((lastSpendingAdded) => {
                    obj.saveEmailsAfterThisDate = lastSpendingAdded[0].created_at_parsed

                    //extract info from emails
                    //!!Any nested promise won't pick up(from obj) correct values if the values com from the extraction variable. meaning that all of the needed data coming from extraction needs to be re inserted into obj at every level of nested ".this". This might be happening because in helpers file where the extractInfoFromEmail functions is located, I have a bunch of code wrapped in "{}" for no other reason rather than because I wanted to collapse sections of the code. but those might causing some odd behavior(this is just a guess, I haven't debugged this yet, cause it's working as it is)
                    const extraction = helpers.extractInfoFromEmail(email, obj.saveEmailsAfterThisDate)

                    //prevent extraction from printing empty objects when email dates are out of time frame range
                    if (Object.entries(extraction).length > 0) {

                      // add info to obj then to db
                      if (extraction.card_number) {
                        obj.card_number = extraction.card_number

                        //check if card number is already in the db
                        generalQueries.getCardByNumber(obj)
                          .then((getCard) => {
                            if (getCard === "not found") {
                              obj.card_number = extraction.card_number
                              
                              //save Card From Email
                              sql_inserts.saveCard(obj)
                                .then((saveCard) => {
                                  return console.log(saveCard)
                                })
                            } else { return console.log("Card already exists") }
                          })

                      } if (extraction.holdings) {
                        obj.holdings = extraction.holdings

                        sql_inserts.saveAccountHoldings(obj)
                          .then((saveHoldings) => {
                            console.log(saveHoldings)
                          })
                      } if (extraction.store_name && extraction.amount_spent && extraction.subject && extraction.created_at_parsed) {

                        //The nested queries are meant to retrieve necessary info from db to pass into the saveSpending function
                        generalQueries.getDefaultCategoryByUserId(obj.user_id)
                          .then((defaultCategory) => {
                            obj.default_category = defaultCategory[0].category
                            obj.store_name = extraction.store_name

                            generalQueries.getSelectedCategoryByStore(obj)
                              .then((selectedCategory) => {
                                obj.selected_category = selectedCategory[0].selected_category
                                obj.store_name = extraction.store_name
                                obj.subject = extraction.subject
                                obj.amount_spent = extraction.amount_spent
                                obj.created_at_parsed = extraction.created_at_parsed

                                sql_inserts.saveSpending(obj)
                                  .then((resp) => {
                                    return console.log(resp)
                                  })
                              })
                          })
                      }
                    }
                  })
              }
            })
            .catch((e) => {
              return console.log(e.message)
            })
        })
    })

  generalQueries.getSpendingWithDefaultCategory(obj)
  .then((SpendingWithDefaultCategory) => {
    generalQueries.getSpendingWithSetCategory(obj)
    .then((SpendingWithSetCategory) => {
      const response = {for_selected_categories: SpendingWithSetCategory, for_default_category: SpendingWithDefaultCategory}
      res.json(response)
    }) 
  })

})

module.exports = router;



