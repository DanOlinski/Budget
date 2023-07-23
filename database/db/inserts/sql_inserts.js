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

module.exports = {
  saveUserToDb
};
