const express = require('express');
const router  = express.Router();
const generalQueries = require('../db/queries/generalQueries');
const sql_inserts = require('../db/inserts/sql_inserts');
const axios = require('axios');
const helpers = require('../routes/helpers')
const qs = require('qs')

//api request to microsoft outlook
router.get('/emailApiRequest', (req, res) => {

  const objForEmailAPIRequest = {
    initialUrl: 'https://graph.microsoft.com/v1.0/users/final.project.lhl@outlook.com/mailFolders',
    folderId: '/AQMkADAwATMwMAItNjJkOC0xMzJiLTAwAi0wMAoALgAAAy3KWEvbj4tIvxN9uTIgazUBAMVxau0anYpLoRd2HmPfL1sAAAAEH75WAAAA',
    endUrlForFolderLength: '/totalItemCount',
    endUrlForDataRequest: '/messages?%24top=', //after the '=' sign place the folder length(numeric)
    urlRequestFlderLength: `${this.initialUrl}${this.folderId}${this.endUrlForFolderLength}`,

    urlComingFromFrontEndExample: `${this.initialUrl}${this.folderId}`,

    urlRequestForDataExample: `${this.initialUrl}${this.folderId}${this.urlRequestForData}${'<folder length>'}`,
    headersForDataRequest: {
      headers: {
        "Authorization": `Bearer EwCIA8l6BAAUAOyDv0l6PcCVu89kmzvqZmkWABkAAaAyozQb14yXs/XZ5E7AU21Tohc9OVZtFiKZLY/B1QjiRTLaZsgL+VRWHn5XqrCUaRNOdRrOK3nvZ1lmDHebnr9dDWgQn17FALJhLxhaeDZ6OzQRI/3qHZdi5v2OynwD2Lbaavl0sxUoItrr+k+bkVUwx0a65g3LN1FYnFhUgVQhoZ731Lp0KjlSDwmtoff8hFNmcPlTOSLJtpO/b9SxAexNBqaGqTm/OKK1mGnG/M0DLsV4axPqF2kLfjSNWm014ZGKfAVudX1c4m4eOr/HhUFcuvRIwqVc8fIkyxLZk87SA5HVT73V0UOuaL35mVGKMCJxmaRm3Z4g+LG7z9yYeAEDZgAACI5HgLIRt/WtWAJ/ClJCyTNuJzfdG7NDGkStVmw4bALR6S3ozXXGVw7CgWMU3r2FaubbDmbaYmbyAtlm6/K+JnxFuaYOg0AOyTMEfgmuXtK8U9m7QVP/wc/H2PW0t36s4uwAam29AlI5xzJ+DdEJWHVkkuqlMqt09uhaAXg0CRqOS+dK9T96hAX4xKoaofGLxH/lXf13kZZOU2U3C0Yg2qQjtiZgzToB3MIN0r5T/+3cgReuJDSXDUVN/5PVLdtHFRYDPWSBPxvnCkz+0m2FRdCsDmFhulksokBq/0nMlBSKQHVXw7pi09ct+PK/zu0ob750Yhnwo8c/8IDCSrnQy/I22ZVe/HFcc6hywYg2bGcxOvZH90oblE3SOKR6zj8kv+FFRH2Zix/5xGRw6hy6XLsRrTanpVSXbOOdXs960Y7JJwWa14TF47QlMFCKPhQ0ynlf+EfFkZJCvptkbd0FykFxH0FdIMX/5cwrA3cLuhuvpF9OxezibuwCqxh71rTBoyMzJAV+GrR0PF4E9XlQrczrPp175nYAk7bcQedjl+eeuMe6YLObz2kGOYnT8sI5jSZ1Z25H841ZEkGCI5VkH24u/ZFo5h+djQUEJ7sHIi+XuAVNBigO3KcrPjsVuqeBvifGVVa7RU9ZDhAGqMYJC07il7YPYtmDLQmjjTSRVVxJfINK6Vwnx/+5ArGU6g38cO5tPmqVmhjakOVM9fCSKnA5QK8gUSTlIDr3unMK7ewFgmZWNpjKOLpmGlZ6KS+aiqxQKKApLXOagacR4Xvqeb7iClVoYnl7jA2uWvrW1zkFPKuoAg==`,
      }
    }
  }
  const emailMessagesRequest = (obj) => {
    //request for the folder length
    const getFolderLengthUrl = `${obj.initialUrl}${obj.folderId}${obj.endUrlForFolderLength}`
    axios.get(getFolderLengthUrl, obj.headersForDataRequest)
    .then((resp)=>{
      const folderLength = resp.data.value
      const url = `${obj.initialUrl}${obj.folderId}${obj.endUrlForDataRequest}${folderLength}`
      axios.get(url, obj.headersForDataRequest)
      .then((r)=>{
        return console.log(r.data.value)
      })
      .catch((e)=>{
        return console.log(e.message)
      })
    })
  }
  emailMessagesRequest(objForEmailAPIRequest)

  res.json("t")

});

//find user by id; http://localhost:8000/debug/queryGetRequest/1
router.get('/queryGetRequest/:id', (req, res) => {
  //commented out, below is the most basic way of displaying data to the browser, the displayed data can be used as data when there is an API request from a remote server
  //res.json("response on browser")
  
  generalQueries.debugQuery(req.params.id)
  .then(
    (resp) => {
      res.json(resp)
  })
});

//for this server to be able to receive incoming data from an API request you need to use express.json in the server setup file: app.use(express.json())
//the following rout creates a new user, adding the info to the database
router.put("/queryPutRequest", (req, res) => {
  let newUser = req.body
  //check for empty fields
  if (!newUser.email || !newUser.hashedPassword) {
    return res.send({error: 'empty field(s)'})
  }

  //check if passed in email is already in the db
  generalQueries.getUserByEmail(newUser.email)
    .then(checkUser => {
      //check if user exists
      if (checkUser !== "not found") {
        return res.send({error: 'user already registered'});
      }
      //if user does not exist add user to the db, add a cookie with user's encrypted email then redirect to home page
      sql_inserts.saveUserToDb(newUser);
      return res.send('user successfully saved to db');
    })
    .catch((error) => {
      return console.log(error.message);
    });
})

//   http://localhost:8000/debug/save_info_from_email
router.get("/save_info_from_email", (req, res) => {
  res.json("test")

  const obj = {
    bank: 'Scotiabank', //comes from front end
    user_id: 1, //get from session
    token: 'ttt',
    subject: 'Authorization on your credit account', //email
    amount_spent: 12.00, //email
    store_name: "SAFEWAY", //email
    created_at_parsed: '1688169600000', //email
    card_number: '123' //email
  }

  //this function uses many functions from queries folder to save a new spending
  //expected obj {user_id, bank, subject, amount_spent, store_name, created_at_parsed}
  const saveNewSpending = (obj) => {
  //add info from db to obj (this obj will be used to save the spending)
  generalQueries.getDefaultCategoryByUserId(obj.user_id)
  .then((resp) => {
    obj.default_category = resp[0].category
    
    generalQueries.getSelectedCategoryByStore(obj)
    .then((resp) => {
      obj.selected_category = resp[0].selected_category
      
      generalQueries.getAccountInfoByUserIdAndBank(obj.user_id, obj.bank)
      .then((resp) => {
        obj.account_id = resp[0].id
      
        sql_inserts.saveSpending(obj)
        .then((resp) => {
            //return resp
            return console.log(resp)
        })
      })
    })
  })
  }
  //saveNewSpending(obj)

  const saveCardFromEmail = (obj) => {
    generalQueries.getAccountInfoByUserIdAndBank(obj.user_id, obj.bank)
    .then((resp) => {
      obj.account_id = resp[0].id
      generalQueries.getCardByNumber(obj)
      .then((resp) => {
        if(resp === "not found"){
          sql_inserts.saveCard(obj)
          .then((resp) => {
            return console.log(resp)
          })
        }else{return console.log("Card already exists")}
      })
    })
  }
  //saveCardFromEmail(obj)

})

//   http://localhost:8000/debug/get_tester
router.get("/get_tester", (req, res) => {
  res.json("test")
  



})

module.exports = router;

