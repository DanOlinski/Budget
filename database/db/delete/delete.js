const db = require('../connection');

const removeDefaultCategory = () => {

  const sqlQuery = `
  UPDATE categories
  SET is_default = FALSE
  WHERE is_default = TRUE;
  `;

  return db.query(sqlQuery)
      .then(() => "info removed from database")
      .catch((err) => console.log(err.message))//debug in terminal
};

module.exports = {
  removeDefaultCategory
};
