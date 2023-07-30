const db = require('../connection');

//this function takes in an object with user info coming from a client interface form. The object must contain all necessary data
const saveUserToDb = (userObj) => {
  //return null if no id is passed in
  console.log("user object in saveUserToDb", userObj);
  if (!userObj.email || !userObj.password) {return null}

  const values = [userObj.email, userObj.password];
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

const setDefaultCategoryToTrue = (category_name, user_id) => {
  //return null if there is missing data from incoming object
  if (!category_name || !user_id) {return null}

  const values = [category_name, user_id];
  const sqlQuery = `
  UPDATE categories
  SET is_default = TRUE
  WHERE category = $1
  AND user_id = $2;
  `;

  return db.query(sqlQuery, values)
      .then(() => "info added to database")
      .catch((err) => console.log(err.message))//debug in terminal
};

const addDefaultCategoryToStores = (category, user_id) => {
//return null if there is missing data from incoming object
if (!category || !user_id) {return null}

const values = [category, user_id];
const sqlQuery = `
UPDATE spending
SET default_category = $1
WHERE user_id = $2
`;

return db.query(sqlQuery, values)
    .then(() => "info added to database")
    .catch((err) => console.log(err.message))//debug in terminal
};

const setBudgetLimit = (obj) => {
  //return null if there is missing data from incoming object
  if (!obj.budget_limit || !obj.user_id || !obj.category) {return null}

  const values = [obj.budget_limit, obj.user_id, obj.category];
  const sqlQuery = `
  UPDATE categories
  SET budget = $1
  WHERE user_id = $2
  AND category = $3;
  `;

  return db.query(sqlQuery, values)
      .then(() => "info added to database")
      .catch((err) => console.log(err.message))//debug in terminal
};

const createNewCategory = (obj) => {
  //return null if there is missing data from incoming object
  if (!obj.user_id || !obj.category) {return null}

  const values = [obj.user_id, obj.category];
  const sqlQuery = `
  INSERT INTO categories(
    user_id,
    category
  )
  VALUES(
    $1,
    $2
  );
  `;

  return db.query(sqlQuery, values)
      .then(() => "info added to database")
      .catch((err) => console.log(err.message))//debug in terminal
};

const assignCategoryToSpending = (obj) => {
  //return null if there is missing data from incoming object
  if (!obj.user_id || !obj.category || !obj.store_name) {return null}

  const values = [obj.user_id, obj.category, obj.store_name];
  const sqlQuery = `
  UPDATE spending
  SET selected_category = $2
  WHERE user_id = $1
  AND store_name = $3;
  `;

  return db.query(sqlQuery, values)
      .then(() => "info added to database")
      .catch((err) => console.log(err.message))//debug in terminal
};


const createNewAccount = (obj) => {
  //return null if there is missing data from incoming object
  if (!obj.user_id || !obj.bank || !obj.token || !obj.folder_url) {return null}

  const values = [obj.user_id, obj.bank, obj.token, obj.folder_url];
  const sqlQuery = `
  INSERT INTO accounts(
    user_id,
    bank,
    token,
    folder_url
  )
  VALUES(
    $1,
    $2,
    $3,
    $4
  );
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
  addDefaultCategoryToStores,
  setBudgetLimit,
  createNewCategory,
  assignCategoryToSpending,
  createNewAccount
};
