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

module.exports = {
  compareDates,
  parseIsoDate
}
