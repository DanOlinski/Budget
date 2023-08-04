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
function calculateSpendingByCategory(data) {
  console.log(data);

  let categories = {};

  let allSpending = Object.keys(data);
  console.log("this is all spending", allSpending);

  allSpending.forEach((key) => {
    const currentSpending = data[key]
    console.log("current spending", currentSpending)

    if (!Array.isArray(currentSpending)) {
      console.error("currentSpending is not an array:", currentSpending);
      return; // Skip this iteration if currentSpending is not an array
    }
 
  // for each category push a category with the amount spent
  currentSpending.forEach ((transaction) => {
  const category = transaction.selected_category || transaction.default_category;
  const amountSpent = parseInt(transaction.amount_spent);

  // if the category already exists, just add to total else if new, add amountSpent
  if (categories[category]) {
    categories[category] += amountSpent;
  } else {
    categories[category] = amountSpent;
  }

});
})
console.log("these are the cat",categories);
return categories;

}

// have to get spending by category

export default calculateSpendingByCategory;
