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

  //selecting all columns from users
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

  //selecting all columns from users
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

//store names if store name exists
const getStoreByUserId = (email, time) => {
  //return null if no id is passed in
  if (!email) {
    return null;
  }

  //protect db from SQL injections
  const values = [email];

  //selecting all columns from users
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

const getEmailSubjectByUserId = (email, time) => {
  //return null if no id is passed in
  if (!email) {
    return null;
  }

  //protect db from SQL injections
  const values = [email];

  //selecting all columns from users
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

const getMonetaryValueByUserId = (email, time) => {
  //return null if no id is passed in
  if (!email) {
    return null;
  }

  //protect db from SQL injections
  const values = [email];

  //selecting all columns from users
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

const getAccountNumberByUserId = (email, time) => {
  //return null if no id is passed in
  if (!email) {
    return null;
  }

  //protect db from SQL injections
  const values = [email];

  //selecting all columns from users
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

///by account number+used id
const getAccountHoldings = (email, time) => {
  //return null if no id is passed in
  if (!email) {
    return null;
  }

  //protect db from SQL injections
  const values = [email];

  //selecting all columns from users
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

module.exports = {
  debugQuery,
  getUserByEmail,
  getPasswordByEmail
};
