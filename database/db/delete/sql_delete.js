const db = require('../connection');

const removeDefaultCategory = (user_id) => {
  //return null if no id is passed in
  if (!user_id) {
    return null;
  }
  const values = [user_id]
  const sqlQuery = `
  UPDATE categories
  SET is_default = FALSE
  WHERE is_default = TRUE
  AND user_id = $1;
  `;

  return db.query(sqlQuery, values)
      .then(() => "info removed from database")
      .catch((err) => console.log(err.message))//debug in terminal
};

const deleteCategory = (obj) => {
  //return null if no id is passed in
  if (!obj.user_id || !obj.category) {
    return null;
  }

  const values = [obj.user_id, obj.category]
  const sqlQuery = `
  DELETE FROM categories
  WHERE user_id = $1
  AND category = $2;
  `;

  return db.query(sqlQuery, values)
      .then(() => "info removed from database")
      .catch((err) => console.log(err.message))//debug in terminal
};

const removeCategoryFromSpending = (obj) => {
  //return null if no id is passed in
  if (!obj.user_id || !obj.store_name) {
    return null;
  }

  const values = [obj.user_id, obj.store_name]
  const sqlQuery = `
  UPDATE spending
  SET selected_category = NULL
  WHERE store_name = $2
  AND user_id = $1;
  `;

  return db.query(sqlQuery, values)
      .then(() => "info removed from database")
      .catch((err) => console.log(err.message))//debug in terminal
};

module.exports = {
  removeDefaultCategory,
  deleteCategory,
  removeCategoryFromSpending
};
