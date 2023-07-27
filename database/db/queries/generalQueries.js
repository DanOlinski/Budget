const db = require('../connection');

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
    .then(res => {return res.rows[0]})
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
      return res.rows[0]
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
      return res.rows[0]
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
      return res.rows[0]
    })
    .catch((err) => console.log(err.message))//debug in terminal
};

const getSpendingByUserId = (user_id) => {
  //return null if no id is passed in
  if (!user_id) {
    return null;
  }

  //protect db from SQL injections
  const values = [user_id];

  const sqlQuery = `
  SELECT spending.*
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
      return res.rows[0]
    })
    .catch((err) => console.log(err.message))//debug in terminal
};

const getAccountInfoByUserId = (user_id, account_number) => {
  //return null if no id is passed in
  if (!user_id || !account_number) {
    return null;
  }

  //protect db from SQL injections
  const values = [user_id, account_number];

  const sqlQuery = `
  SELECT *
      FROM accounts
      WHERE user_id = $1
      AND account_number = $2;
  `;

  return db.query(sqlQuery, values)
    .then(res => {
      //if sql does not find anything return a message
      //console.log(res.rows)
      if(res.rows.length === 0){
        return ("not found")
      }
      return res.rows[0]
    })
    .catch((err) => console.log(err.message))//debug in terminal
};

module.exports = {
  debugQuery,
  getUserByEmail,
  getPasswordByEmail,
  getStoresByUserId,
  getSpendingByUserId,
  getAccountInfoByUserId
};
