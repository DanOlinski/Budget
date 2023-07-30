const express = require('express');
const router  = express.Router();
const generalQueries = require('../db/queries/generalQueries');
const sql_inserts = require('../db/inserts/sql_inserts');

const bcrypt = require('bcrypt');


// //find user by id; http://localhost:8000/debug/queryGetRequest/1
// router.get('/password/:email', (req, res) => {

//   generalQueries.getPasswordByEmail(req.params.email)
//   .then(
//     (resp) => {
//       res.json(resp)
//   })
// });

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    console.log(email);
  // check if password match

  try {
  const emailLookUp = await generalQueries.getUserByEmail(email)
  console.log("this is emailLookUp", emailLookUp);
  if (emailLookUp === "not found") {
    return res.status(404).json({ error: "User not found." });
  }

    const hashedPassword = emailLookUp[0].password;
    console.log("hashedpassword", hashedPassword)
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    console.log(passwordMatch)

    if (passwordMatch === true) {
      const message = 'Found user';
      const sendBack = {
        reassuringMessage: message,
        userId: emailLookUp[0].id
      };
      return res.send(sendBack);
    } else {
      return res.status(401).json({ error: 'Incorrect password' });
    }
  } catch (error) {
    // Handle database or other errors
    return res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

//     if (password == response[0].password) {
//       const message = ('found user');
//       const sendBack = {reassuringMessage: message, userId: response[0].id, userEmail: response[0].email}
//       return (res.send(sendBack));
//     }
//   })
//   .catch ((error) => {
//   // Handle database or other errors
//   console.error('Login error:', error);
//   })
// });

//for this server to be able to receive incoming data from an API request you need to use express.json in the server setup file: app.use(express.json())
//the following rout creates a new user, adding the info to the database
// eli - modified the route to a post route since we are pushing new data
router.post("/create", async (req, res) => {
  const { email, password } = req.body;

  // check for empty fields
  if (!email || !password) {
    return res.status(400).send({ error: 'Empty field(s)' });
  }

  try {
    const checkUser = await generalQueries.getUserByEmail(email);
    if (checkUser !== "not found") {
      return res.status(409).send({ error: 'User already registered' });
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    const newUser = {
      email: email,
      password: hash,
    };

    sql_inserts.saveUserToDb(newUser);

    const response = await generalQueries.getUserByEmail(email);
    const message = 'User successfully saved to db';
    console.log(response);
    const sendBack = { reassuringMessage: message, userId: response[0].id, userEmail: response[0].email };
    console.log(sendBack);
    return res.send(sendBack);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ error: 'An error occurred' });
  }
});




module.exports = router;



