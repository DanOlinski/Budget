const db = require('../connection');

//this function takes in an object with user info coming from a client interface form. The object must contain all necessary data
const saveUserToDb = (userObj) => {
  //return null if no id is passed in
  if (!userObj.email || !userObj.hashedPassword) {return null}

  const values = [userObj.email, userObj.hashedPassword];
  const sqlQuery = `
    INSERT INTO users(email, password)
    VALUES ($1, $2);
  `;

  return db.query(sqlQuery, values)
      .then(() => "user added to database")
      .catch((err) => console.log(err.message))//debug in terminal
};

//this function takes in an object with user_id, bank, token(coming from microsoft graphs) The object must contain all necessary data
const saveToken = (obj) => {
  //return null if there is missing data from incoming object
  if (!obj.user_id || !obj.bank || !obj.token) {return null}

  const values = [obj.user_id, obj.bank, obj.token];
  const sqlQuery = `
  UPDATE accounts
  SET token = $3
  WHERE user_id = $1
  AND bank = $2;
  `;

  return db.query(sqlQuery, values)
      .then(() => "info added to database")
      .catch((err) => console.log(err.message))//debug in terminal
};

//this function takes in an object with user_id, bank, folder_url(coming from microsoft graphs)
const saveFolderUrl = (obj) => {
  //return null if there is missing data from incoming object
  if (!obj.user_id || !obj.bank || !obj.folder_url) {return null}

  const values = [obj.user_id, obj.bank, obj.folder_url];
  const sqlQuery = `
  UPDATE accounts
  SET folder_url = $3
  WHERE user_id = $1
  AND bank = $2;
  `;

  return db.query(sqlQuery, values)
      .then(() => "info added to database")
      .catch((err) => console.log(err.message))//debug in terminal
};

//this function takes in an object with user_id, bank, folder_url(coming from microsoft graphs)
const saveAccountHoldings = (obj) => {
  //return null if there is missing data from incoming object
  if (!obj.user_id || !obj.bank || !obj.holdings) {return null}

  const values = [obj.user_id, obj.bank, obj.holdings];
  const sqlQuery = `
  UPDATE accounts
  SET holdings = $3
  WHERE user_id = $1
  AND bank = $2;
  `;

  return db.query(sqlQuery, values)
      .then(() => "info added to database")
      .catch((err) => console.log(err.message))//debug in terminal
};

//this function takes in an object with account_id, bank, folder_url(coming from microsoft graphs)
const saveCard = (obj) => {
  //return null if there is missing data from incoming object
  if (!obj.user_id || !obj.bank || !obj.holdings) {return null}

  const values = [obj.user_id, obj.bank, obj.holdings];
  const sqlQuery = `
  UPDATE accounts
  SET holdings = $3
  WHERE user_id = $1
  AND bank = $2;
  `;

  return db.query(sqlQuery, values)
      .then(() => "info added to database")
      .catch((err) => console.log(err.message))//debug in terminal
};

const setDefaultCategoryToTrue = (category_name) => {
  //return null if there is missing data from incoming object
  if (!category_name) {return null}

  const values = [category_name];
  const sqlQuery = `
  UPDATE categories
  SET is_default = TRUE
  WHERE category = $1;
  `;

  return db.query(sqlQuery, values)
      .then(() => "info added to database")
      .catch((err) => console.log(err.message))//debug in terminal
};

const addDefaultCategoryToStores = (category_id) => {
//return null if there is missing data from incoming object
if (!category_id) {return null}

const values = [category_id];
const sqlQuery = `
UPDATE spending
SET default_category = $1
`;

return db.query(sqlQuery, values)
    .then(() => "info added to database")
    .catch((err) => console.log(err.message))//debug in terminal
};

module.exports = {
  saveUserToDb,
  saveToken,
  saveFolderUrl,
  saveAccountHoldings,
  saveCard,
  setDefaultCategoryToTrue,
  addDefaultCategoryToStores
};
