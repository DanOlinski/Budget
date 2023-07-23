const fetch = require('node-fetch');
const generalQueries = require('../db/queries/generalQueries');
const sql_inserts = require('../db/inserts/sql_inserts');

const token = {
    token: "EwCQA8l6BAAUAOyDv0l6PcCVu89kmzvqZmkWABkAAdUp169dAJE9PdLSjXHsJ5C0sWp4uA6Fdy9r7SXbum55lLaZ6Hi0cl2lOv27S15pStAVh/6K0bgjyA+CUjzobgwPtJ/qsboKht2xSIXFWv+x9iWs2JxJ/9lLc5GSzgGhDZPTgtbIRpofB1/6qWHK2GT41XZnp8A29Ihm3bzs0ccfpAG/k+BLBWhKjTkEsZsQEkkrjJR8MUY/ZTbMEPWcnCTITrQMeMYh/h9lCgX7gxa63fLoB9Zrpo6l1hVzC+GhmWG6jc43CLkZYxT970A3yuHDWG/FI9CICi/Ed+JGKn/VxqpCHfCu+3h/dLmQ7HzMtMiO+05lojQuPmy3lj3BMp4DZgAACPZx/fr+2oxBYAILhhMiitK2Y1eSmqA87mE0SVvTkBvX5V5pRGW+ZSuJeNfwavYf/Asm7KxE1d4lfaPc6vuLGmHbLyUH5PatS9yLlztk7EfWaYkVfH1sj47VHsapKWeRGD2dWAZE7DbfS5VzSrZDedpildHzhI1gCIE855v30y4khKQXdtTmh1+gO+vSSuzhZRRUFj4oP/ZkSUxL/cVSfY/jbNKcs+qFfKrDUDwGI7Z7Q374rd1iOHO8ChqDRiwM0aP7OjFQ5A2qMsP+yHOjOkrvFHN2m42LhmVDgaAb9QgPBsofNCVRzK0NmAJfp1c0zDzjvru7bakjTcutvsKiAHx1rKgbmJQTi8xs6Jc8NXiyazLlzMvDRHpznep8UhUZx1tWVWDpN/h5Ka6NNTwQQpmIiR4YNt/t1om9oGfUJedxDRDnj9bssz6fat3q1IzE/CBZ/GTtZR1xn2v99j3hecnG6/yoz42TVqfLmH4AJpSViFQjn6XW4eSHCrpNV2G8R9eZVYRUEQxukZ0cErCcjK6ikmQpCyZX/saALJCtwiLbuM/YOjW4SizCBgRr5KkuuRxJ3qiHg7QEoxeSv5iU7jpuk94IcIXKyOxuvG0Q1XGqmzWlA2y0oW3U3GbcR72fOxIVCT0+npzZq040y8Sa7QKg/xJwdKeIJVNI843MBjFN00HQHFhaYR3RWpenlikB71I0gAGjKIu45dzZ9TZJWNNLz+pCw+Bde3EffIpJaGgkbeao5VAgcDkNWLkG0SdNqPJYIc2Lb860kYk/mJsPCb5Bqclu93FpadtHZNmKB59YBZhB2+GEREXaAKMC"
}
const url = 'https://graph.microsoft.com/v1.0/users/daniel.guterres@hotmail.com'
const fetchAPI = () => {
    return fetch(
      url,
      {
        headers: {
          //this is the authentication
          "Authorization": `Bearer ${token.token}`,
          //this determains the tipe of info I want to fetch
          "Content-Type": "application/json"
        } 
      }
    )
}
{//call the fetch function
/* 
fetchAPI()
  .then((response) => {
      
        //if I want to send the information to be processed somewhere else I would use return response.json. this would return a promise that would have to be resolved by the receiver of this info. If I want to resolve it here I can do as follows:
        response.json()
        .then(
          (res) => {
            console.log(res)
          }
        )
  })
*/
}

//for debuging
const addNewUserObj ={
  email: 'user444444444444@host.com', 
  //the password is "password"
  password: 'password'
}

module.exports = {
  fetchAPI,
  addNewUserObj
}
