const fetch = require('node-fetch');

  const token = {token: "EwCQA8l6BAAUAOyDv0l6PcCVu89kmzvqZmkWABkAAdsZhiGWIzFDmIS5NtN2zv50oqL7IhCuKaSKfuXAnvPzg11/X+8PuqXN/bZRZ6QlO/9XseUu0VnHDtD/hV2KQ+s7XkpRcdtnZKXM/IR1o6+gZKe1qqo1QmOkJBg5At3TLA+1WIMTMLFSOCtdsjf8BFAPsHg+FJNJBIUXuBUhdqEbESHQbMz31qXvctu7iMy9CVQcOtA3WYIefyFg+Z78WlMaOvYBypinw5YKVN2I9gtcrtX+wNYoqpKhimoIsO0kXodzg94crbec776LnqybMTiPq9GMGumHlCp52tXjd2257q8e5MfVv0IHKJC5XjXRrxaQFtbhx04VlvXWBL1zt9MDZgAACGdTdvS6U8H2YAIF3h7c7byx7JWOUB7Mxh3Vqcu8KLqCWnXQlWDon8BXazacb+6gI8XxMYxqvUJHnZOUIP2BRUGTyOUHhGtW81vM3ipQMZqHnEiZCh5Lg39D8GYrYGBFu0JGM6ITYdjn4c8h5WmfDY6FZsI0Jc3gXPgq/vCZIwroISME5QWfhFHpKFGsyXBHXnv6enVDQdDwBddRYb+gW0F8bE6cYsuuzroZ1Hm3b2DZV10ZJuNAvT2LDQ5brVUWlB6WQeLx2qjGyH1nBzkZ6usfd0KjP7cLNbIZe80aF2z8YtKqe3OsvB5PsX7Y4VgdoDL3y2eiD21gUeyVKY3tiNjSA7tK5iIdrgAxqAxMIyJM60BYkLISXi+4q4syxxBZCzeJbTpwXFS8rKZ2msWtLi1duIa+2e/CPK1UuyNhe/n9uUdiU3QNTY0seQy9m7/7sZ9+8ySjRSO3lmQ4RFDtqP8N7f1k0i4KUjdA+4kgNRJ9sdsdNoXGL0R6+L+QmIi5laoBHwoKfzceoiuKhOhY60t0UTF8KQh/Xr8KbhO9QTtOA9uGY8SitCdJTw+k3+GSEp0LbarFfYoZ+aB4euLx4omYTTi/gFveYyB7/Wq38Gos1njNoIYQpGaCulXpoplsWv5/45OfbQLpXxLHgrT2S72tQET938sv9xVAlLQ2/y0u9ca/+cCoGZ+OLFgnf4ZZeLThAoUWBGs2xnsK6Agtp1HyUFtz4ZBOFknAtEplTonKB2gAuvPX0jC2jjPGXkjJg+hwka8PbM+FRsQ+v7Il6EmGSrWTOaeCO20kP2yAhz4r0Xx0TRcDPvqHkqMC"}
  
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

/*
//call the fetch function
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

//request: const helpers = require("../db/scripts/helpers")
//helpers.fetchAPI...
module.exports = {
  fetchAPI
}