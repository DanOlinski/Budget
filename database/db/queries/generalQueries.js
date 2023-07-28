const db = require('../connection');
const helpers = require('../../routes/helpers');

//this is a query to test db access
const debugQuery = function(id) {
  //return null if no id is passed in
  if (!id) {
    return null;
  }

  //protect db from SQL injections
  const values = [id];

  //selecting all columns from users
  const sqlQuery = `
  SELECT *
  FROM users
  WHERE id = $1;
  `;

  return db.query(sqlQuery, values)
    .then(res => {return res.rows})
    .catch((err) => console.log(err.message))//debug in terminal
};

const getUserByEmail = (email) => {
  //return null if no id is passed in
  if (!email) {
    return null;
  }

  //protect db from SQL injections
  const values = [email];

  const sqlQuery = `
  SELECT *
  FROM users
  WHERE email = $1;
  `;

  return db.query(sqlQuery, values)
    .then(res => {
      //if sql does not find anything return a message
      //console.log(res.rows)
      if(res.rows.length === 0){
        return ("not found")
      }
      return res.rows
    })
    .catch((err) => console.log(err.message))//debug in terminal
};

const getPasswordByEmail = (email) => {
  //return null if no id is passed in
  if (!email) {
    return null;
  }

  //protect db from SQL injections
  const values = [email];

  const sqlQuery = `
  SELECT password
  FROM users
  WHERE email = $1;
  `;

  return db.query(sqlQuery, values)
    .then(res => {
      //if sql does not find anything return a message
      //console.log(res.rows)
      if(res.rows.length === 0){
        return ("not found")
      }
      return res.rows
    })
    .catch((err) => console.log(err.message))//debug in terminal
};

const getStoresByUserId = (user_id) => {
  //return null if no id is passed in
  if (!user_id) {
    return null;
  }

  //protect db from SQL injections
  const values = [user_id];

  const sqlQuery = `
  SELECT spending.store_name
  FROM spending
  JOIN accounts ON account_id = accounts.id
  WHERE accounts.user_id = $1;
  `;

  return db.query(sqlQuery, values)
    .then(res => {
      //if sql does not find anything return a message
      //console.log(res.rows)
      if(res.rows.length === 0){
        return ("not found")
      }
      return res.rows
    })
    .catch((err) => console.log(err.message))//debug in terminal
};

//returns all spending(that have an assigned category) within a time frame.
//expected obj: user_id, start_date, end_date
const getSpendingWithSetCategory = (obj) => {
  //return null if no id is passed in
  if (!obj.user_id || !obj.start_date || !obj.end_date) {
    return null;
  }

  const parsedStartDate = helpers.parseIsoDate(obj.start_date)
  const parsedEndDate = helpers.parseIsoDate(obj.end_date)

  //protect db from SQL injections
  const values = [obj.user_id, parsedStartDate, parsedEndDate];

  const sqlQuery = `
  SELECT spending.*, accounts.bank, cards.card_number
  FROM spending
  JOIN accounts ON spending.account_id = accounts.id
  JOIN cards ON accounts.id = cards.account_id
  WHERE accounts.user_id = $1
  AND created_at_parsed >= $2
  AND created_at_parsed <= $3
  AND selected_category IS NOT NULL;
  `;

  return db.query(sqlQuery, values)
    .then(res => {
      //if sql does not find anything return a message
      //console.log(res.rows)
      if(res.rows.length === 0){
        return ("not found")
      }
      return res.rows
    })
    .catch((err) => console.log(err.message))//debug in terminal
};

//returns all spending(that don't have an assigned category) within a time frame.
//expected obj: user_id, start_date, end_date
const getSpendingWithDefaultCategory = (obj) => {
  //return null if no id is passed in
  if (!obj.user_id || !obj.start_date || !obj.end_date) {
    return null;
  }

  const parsedStartDate = helpers.parseIsoDate(obj.start_date)
  const parsedEndDate = helpers.parseIsoDate(obj.end_date)

  //protect db from SQL injections
  const values = [obj.user_id, parsedStartDate, parsedEndDate];

  const sqlQuery = `
  SELECT spending.*, accounts.bank, cards.card_number
  FROM spending
  JOIN accounts ON spending.account_id = accounts.id
  JOIN cards ON accounts.id = cards.account_id
  WHERE accounts.user_id = $1
  AND created_at_parsed >= $2
  AND created_at_parsed <= $3
  AND selected_category IS NULL;
  `;

  return db.query(sqlQuery, values)
    .then(res => {
      //if sql does not find anything return a message
      //console.log(res.rows)
      if(res.rows.length === 0){
        return ("not found")
      }
      return res.rows
    })
    .catch((err) => console.log(err.message))//debug in terminal
};

const getAccountInfoByUserId = (user_id, bank) => {
  //return null if no id is passed in
  if (!user_id || !bank) {
    return null;
  }

  //protect db from SQL injections
  const values = [user_id, bank];
  
  const sqlQuery = `
  SELECT accounts.*
  FROM accounts
  WHERE accounts.user_id = $1
  AND accounts.bank = $2;
  `;

  return db.query(sqlQuery, values)
    .then(res => {
      //if sql does not find anything return a message
      //console.log(res.rows)
      if(res.rows.length === 0){
        return ("not found")
      }
      return res.rows
    })
    .catch((err) => console.log(err.message))//debug in terminal
};

const getTokenFolderByBankUserId = (user_id, bank) => {
  //return null if no id is passed in
  if (!user_id || !bank) {
    return null;
  }

  //protect db from SQL injections
  const values = [user_id, bank];
  
  const sqlQuery = `
  SELECT token, folder_url
  FROM accounts
  WHERE user_id = $1
  AND bank = $2;
  `;

  return db.query(sqlQuery, values)
    .then(res => {
      //if sql does not find anything return a message
      //console.log(res.rows)
      if(res.rows.length === 0){
        return ("not found")
      }
      return res.rows
    })
    .catch((err) => console.log(err.message))//debug in terminal
};


const getCategoriesByUserId = (user_id) => {
  //return null if no id is passed in
  if (!user_id) {
    return null;
  }

  //protect db from SQL injections
  const values = [user_id];

  const sqlQuery = `
  SELECT *
  FROM categories
  WHERE user_id = $1;
  `;

  return db.query(sqlQuery, values)
    .then(res => {
      //if sql does not find anything return a message
      //console.log(res.rows)
      if(res.rows.length === 0){
        return ("not found")
      }
      return res.rows
    })
    .catch((err) => console.log(err.message))//debug in terminal
};

const getCategoryByName = (category, user_id) => {
  //return null if no id is passed in
  if (!category || !user_id) {
    return null;
  }

  //protect db from SQL injections
  const values = [category, user_id];

  const sqlQuery = `
  SELECT *
  FROM categories
  WHERE category = $1
  AND user_id = $2;
  `;

  return db.query(sqlQuery, values)
    .then(res => {
      //if sql does not find anything return a message
      //console.log(res.rows)
      if(res.rows.length === 0){
        return ("not found")
      }
      return res.rows
    })
    .catch((err) => console.log(err.message))//debug in terminal
};

const getDefaultCategoryId = (user_id) => {
  //return null if no id is passed in
  if (!user_id) {
    return null;
  }

  //protect db from SQL injections
  const values = [user_id];

  const sqlQuery = `
  SELECT id
  FROM categories
  WHERE is_default = TRUE
  AND user_id = $1;
  `;

  return db.query(sqlQuery, values)
    .then(res => {
      //if sql does not find anything return a message
      //console.log(res.rows)
      if(res.rows.length === 0){
        return ("not found")
      }
      return res.rows
    })
    .catch((err) => console.log(err.message))//debug in terminal
};

const getBudgetById = (user_id) => {
  //return null if no id is passed in
  if (!user_id) {
    return null;
  }

  const values = [user_id];
  const sqlQuery = `
  SELECT budget, category
  FROM categories
  WHERE user_id = $1;
  `;

  return db.query(sqlQuery, values)
    .then(res => {
      //if sql does not find anything return a message
      //console.log(res.rows)
      if(res.rows.length === 0){
        return ("not found")
      }
      return res.rows
    })
    .catch((err) => console.log(err.message))//debug in terminal
};

module.exports = {
  debugQuery,
  getUserByEmail,
  getPasswordByEmail,
  getStoresByUserId,
  getAccountInfoByUserId,
  getTokenFolderByBankUserId,
  getCategoriesByUserId,
  getCategoryByName,
  getDefaultCategoryId,
  getBudgetById,
  getSpendingWithDefaultCategory,
  getSpendingWithSetCategory,
};
