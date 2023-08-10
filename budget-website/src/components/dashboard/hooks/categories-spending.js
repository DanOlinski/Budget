// data for testing
// const data =
//   {
//       "id": 3,
//       "user_id": 1,
//       "default_category": "Miscellaneous",
//       "selected_category": null,
//       "account_id": 1,
//       "subject": "Authorization on your credit account",
//       "amount_spent": "25.00",
//       "store_name": "Canadian Tire",
//       "created_at_parsed": "1639958400000",
//       "created_at": "2023-08-02T03:53:45.909Z",
//       "bank": "Scotiabank",
//       "card_number": "*****08*7728"
//   },
//   {
//       "id": 1,
//       "user_id": 1,
//       "default_category": "Miscellaneous",
//       "selected_category": null,
//       "account_id": 1,
//       "subject": "Authorization on your credit account",
//       "amount_spent": "25.00",
//       "store_name": "Toppers",
//       "created_at_parsed": "1638316800000",
//       "created_at": "2023-08-02T03:53:45.909Z",
//       "bank": "Scotiabank",
//       "card_number": "*****08*7728"
//   },
//   {
//     "id": 1,
//     "user_id": 1,
//     "default_category": "Miscellaneous",
//     "selected_category": "Food",
//     "account_id": 1,
//     "subject": "Authorization on your credit account",
//     "amount_spent": "25.00",
//     "store_name": "Toppers",
//     "created_at_parsed": "1638316800000",
//     "created_at": "2023-08-02T03:53:45.909Z",
//     "bank": "Scotiabank",
//     "card_number": "*****08*7728"
// },
// {
//   "id": 1,
//   "user_id": 1,
//   "default_category": "Miscellaneous",
//   "selected_category": "Transportation",
//   "account_id": 1,
//   "subject": "Authorization on your credit account",
//   "amount_spent": "25.00",
//   "store_name": "Toppers",
//   "created_at_parsed": "1638316800000",
//   "created_at": "2023-08-02T03:53:45.909Z",
//   "bank": "Scotiabank",
//   "card_number": "*****08*7728"
// }
// ]
// {
//   "for_selected_categories": [
//       {
//           "id": 2,
//           "user_id": 1,
//           "default_category": "Miscellaneous",
//           "selected_category": "Food",
//           "account_id": 1,
//           "subject": "Authorization on your credit account",
//           "amount_spent": "25.00",
//           "store_name": "SAFEWAY",
//           "created_at_parsed": "1638316800000",
//           "created_at": "2023-08-02T03:53:45.909Z",
//           "bank": "Scotiabank",
//           "card_number": "*****08*7728"
//       }
//   ],
//   "for_default_category": [
//       {
//           "id": 3,
//           "user_id": 1,
//           "default_category": "Miscellaneous",
//           "selected_category": null,
//           "account_id": 1,
//           "subject": "Authorization on your credit account",
//           "amount_spent": "25.00",
//           "store_name": "Canadian Tire",
//           "created_at_parsed": "1639958400000",
//           "created_at": "2023-08-02T03:53:45.909Z",
//           "bank": "Scotiabank",
//           "card_number": "*****08*7728"
//       },
//       {
//           "id": 1,
//           "user_id": 1,
//           "default_category": "Miscellaneous",
//           "selected_category": null,
//           "account_id": 1,
//           "subject": "Authorization on your credit account",
//           "amount_spent": "25.00",
//           "store_name": "Toppers",
//           "created_at_parsed": "1638316800000",
//           "created_at": "2023-08-02T03:53:45.909Z",
//           "bank": "Scotiabank",
//           "card_number": "*****08*7728"
//       }
//   ]
// };

//export function that will calculate spending for all categories

//changed to this function which adds all data into a same array and iterates over each index
// this checks all indexes and only goes through if index is an object and has info inside
// the other method didn't catch when one of the two data keys had "not found" in it
function calculateSpendingByCategory(data) {
  // console.log(data);
  let categories = {};

  const allCategories = [...(data.for_selected_categories || []), ...(data.for_default_category || [])];
   console.log(allCategories);

  allCategories.forEach((transaction) => {
    if (typeof transaction === 'object' && transaction !== null) {

      let category = transaction.selected_category || transaction.default_category;

      if (category !== "not found") {
        const amountSpent = parseInt(transaction.amount_spent.replace("$", ''), 10);

        if (categories[category]) {
          categories[category] += amountSpent;
        } else {
          categories[category] = amountSpent;
        }
  
      }
    }
  })


return categories;

}

  // let allSpending = Object.keys(data);
  // console.log("this is all spending in my function", allSpending);
  // // console.log("this is all spending", allSpending);

  // allSpending.forEach((key) => {
  //   const currentSpending = data[key]
  //   // console.log("current spending", currentSpending)

  //   // if (!Array.isArray(currentSpending)) {
  //   //   console.error("currentSpending is not an array:", currentSpending);
  //   //   return; // Skip this iteration if currentSpending is not an array
  //   // }
 
//   // // for each category push a category with the amount spent
//   // currentSpending.forEach ((transaction) => {
//   // let category = transaction.selected_category;

//   if (!transaction.selected_category) {
//     category = transaction.default_category
//   }

//   const amountSpent = parseInt((transaction.amount_spent).replace("$", ''));

//   // if the category already exists, just add to total else if new, add amountSpent
//   if (categories[category]) {
//     categories[category] += amountSpent;
//   } else {
//     categories[category] = amountSpent;
//   }

// });
// })
// console.log("these are the cat",categories);

// have to get spending by category

export default calculateSpendingByCategory;
