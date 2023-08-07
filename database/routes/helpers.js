const generalQueries = require('../db/queries/generalQueries');
const sql_inserts = require('../db/inserts/sql_inserts');


//compare 2 dates. If dateBefore is older than dateAfter the function will return true
//this function expects a date in ISO format
const compareDates = (dateBefore, dateAfter) => {
  const dateBeforeParesed = Date.parse(dateBefore)
  const dateAfterParsed = Date.parse(dateAfter)

  if(dateBeforeParesed < dateAfterParsed){
    return true
  }
  if(dateBeforeParesed > dateAfterParsed){
    return false
  }
}

//this function expects a data that is in ISO format
const parseIsoDate = (date) => {
  return Date.parse(date)
}

const extractInfoFromEmail = (email, saveEmailsAfterThisDate) => {
  //saveEmailsAfterThisDate needs to be a parsed value from ISO date format
  const emailExtractors = {
    scotiabank: {
      subjectSpendingOnCreditCard: 'Authorization on your credit account',
      subjectAccountBalance: 'Account balance',
      locateEmailSubject: (email) => {
        return email.subject
      },
      locateEmailBody: (email) => {
        return email.bodyPreview
      },
      scanStringForCardNumber: (string) => {
      let start
      let stop = []

      //loop through the email and determain when you find "balance for account", set that index located after the sentence to be stores in "start" variable
      for(let i = 0; i < string.length; i++){
        if(
          string[i-20] === 'b' &&
          string[i-19] === 'a'&&
          string[i-18] === 'l'&&
          string[i-17] === 'a'&&
          string[i-16] === 'n'&&
          string[i-15] === 'c'&&
          string[i-14] === 'e'&&
          string[i-13] === ' '&&
          string[i-12] === 'f'&&
          string[i-11] === 'o'&&
          string[i-10] === 'r'&&
          string[i-9] === ' '&&
          string[i-8] === 'a'&&
          string[i-7] === 'c'&&
          string[i-6] === 'c'&&
          string[i-5] === 'o'&&
          string[i-4] === 'u'&&
          string[i-3] === 'n'&&
          string[i-2] === 't'&&
          string[i-1] === ' '
          ){
          start = i
        }
      }

      //if there are no values in the body of the email return a notice
      if(!string[start]){
        return 'No Value Found'
      }

      for(let i = start; i < string.length; i++){
        if(string[i] === ' '){
          stop.push(i)
        }
      }

      //remove everithing before and after the account number
      let value = string.slice(start, stop[0])

      return value
      },
      scanStringForPrice: (string) => {
        let value
        let start
        let stop =[]


        //loop through the email and determain when you find the $, set that index to start
        // eli note - correct and remove $ sign - include rest of the string (price)
        for(let i = 0; i < string.length; i++){
          if(string[i] === '$'){
            start = i + 1
          }
        }

        //if there are no values in the body of the email return a notice
        if(!string[start]){
          return 'No Value Found'
        }

        //loop through email starting where the $ symbol is and stop when the numbers end. Set that index to stop
        for(let i = start; i < string.length; i++){
          if(string[i] === ' '){
            stop.push(i)
          }
        }

        //remove everithing before the $ and after the price value
        value = string.slice(start, stop[0])

        //remove the last dot of the string if there is one
        if(value[value.length-1] === '.'){
          value = string.slice(start, stop[0]-1)
        }

        return value
      },
      scanStringForStore: (string) => {
        let final
        let start
        let stop =[]
        let boolean = false

        //find where there is an 'at' and save the index number
        for(let i=0;i<string.length;i++){
          if(string[i] === 'a' && string[i+1] === 't' && string[i+2] === ' '){
            start = i+3
            break
            }
          }

        //Find where there is a # and save the index number
        for(let i = start; i < string.length; i++){
          if(string[i] === '#'){
            boolean = true
            stop.push(i-1)
          } else if (string[i] === 'o' && string[i+1] === 'n' && string[i+2] === ' '){
            boolean = true
            stop.push(i)
          }
        }
        //if there is no # than there is no store
        if(!boolean){
          return 'No Value Found'
        }

        final = string.slice(start, stop[0])
        return final
      },
      //this is to grab incoming date to be saved in db at spending.created_at_parsed. However the date marked as incoming for my dummy data is all in the same day since I sent a ton of dummy emails manually. So the dummy date is placed in the body of the email and it's already in ISO format. so this is just for presentation porpuses
      scanStringForDummyDate: (string) => {
        let start
        let stop = []

        //loop through the email and determain when you find "date:", set that index located after the sentence to be stores in "start" variable
        for(let i = 0; i < string.length; i++){
          if(
            string[i-5] === 'd' &&
            string[i-4] === 'a'&&
            string[i-3] === 't'&&
            string[i-2] === 'e'&&
            string[i-1] === ':'
            ){
            start = i
          }
        }

        //if there are no values in the body of the email return a notice
        if(!string[start]){
          return 'No Value Found'
        }

        for(let i = start; i < string.length; i++){
          if(string[i] === 'Z'){
            stop.push(i+1)
          }
        }

        //remove everithing before and after the account number
        let value = string.slice(start, stop[0])

        return value
        },
    }
  }

  const finalObj = {}

  {//extraction from scotiabank

    let dummyIncomingDate
    let dummyIncomingDateParsed

    {//extract card numbers from emails that contain account balance info for db cards.card_number
  if(
    emailExtractors.scotiabank.locateEmailSubject(email) ===
    emailExtractors.scotiabank.subjectAccountBalance
  ) {
    finalObj.card_number = emailExtractors.scotiabank.scanStringForCardNumber(emailExtractors.scotiabank.locateEmailBody(email))
    // console.log(card_number)
  }
    }

    {//extract account holdings for db accounts.holdings
    //consideration: I want to save to db only the most recent account balance, but in my dummy email data I only have a single email informing account balance. So for presentation purposes disconsider incoming date when saving account balance
    if(
      emailExtractors.scotiabank.locateEmailSubject(email) ===
      emailExtractors.scotiabank.subjectAccountBalance
    ) {
      finalObj.holdings = emailExtractors.scotiabank.scanStringForPrice(emailExtractors.scotiabank.locateEmailBody(email))
      // console.log(holdings)
    }
    }

    {//extract dummy incoming date for db spending.created_at_parsed
    if(
      emailExtractors.scotiabank.locateEmailSubject(email) ===
      emailExtractors.scotiabank.subjectSpendingOnCreditCard
    ) {
      dummyIncomingDate = emailExtractors.scotiabank.scanStringForDummyDate(emailExtractors.scotiabank.locateEmailBody(email))
      dummyIncomingDateParsed = Date.parse(emailExtractors.scotiabank.scanStringForDummyDate(emailExtractors.scotiabank.locateEmailBody(email)))
    }
    }

    //for testing porpuses only check the incoming date for spending and store_name. in a real scenario the rest of extracted data should be in this filter
    if(saveEmailsAfterThisDate < dummyIncomingDateParsed) {
    finalObj.created_at_parsed = dummyIncomingDateParsed
    finalObj.created_at_notParsed = dummyIncomingDate

      {//extract spending amount for db spending.amount_spent
      if(
        emailExtractors.scotiabank.locateEmailSubject(email) ===
        emailExtractors.scotiabank.subjectSpendingOnCreditCard
      ) {
        finalObj.amount_spent = emailExtractors.scotiabank.scanStringForPrice(emailExtractors.scotiabank.locateEmailBody(email))
        // console.log(amount_spent)
      }
      }

      {//extract store name for db spending.store_name
      if(
        emailExtractors.scotiabank.locateEmailSubject(email) ===
        emailExtractors.scotiabank.subjectSpendingOnCreditCard
      ) {
        finalObj.store_name = emailExtractors.scotiabank.scanStringForStore(emailExtractors.scotiabank.locateEmailBody(email))
        // console.log(store_name)
      }
      }

      {//extract subject for db spending.subject
        if(
          emailExtractors.scotiabank.locateEmailSubject(email) ===
          emailExtractors.scotiabank.subjectSpendingOnCreditCard
        ) {
          finalObj.subject = emailExtractors.scotiabank.locateEmailSubject(email)
          // console.log(store_name)
        }
      }

    }

  }

  return finalObj
}

module.exports = {
  compareDates,
  parseIsoDate,
  extractInfoFromEmail
}
