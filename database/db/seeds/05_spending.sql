INSERT INTO spending(
  user_id,
  default_category,
  account_id,
  subject,
  amount_spent,
  store_name,
  created_at_parsed
)
VALUES (
  1,
  'General',
  1,
  'Authorization on your credit account',
  25.00,
  'Toppers',
  '1638316800000' --parsed from 2021-12-01T00:00:00Z (ISO format). if you want to use other parsed dates to compare: '2023-06-01T00:00:00Z' =1685577600000 and '2023-08-01T00:00:00Z' = 1690848000000, 2022-01-01T00:00:00Z = 1640995200000, 1688169600000 = 2023-07-01T00:00:00Z, 2023-05-01T00:00:00Z = 1682899200000, 2023-01-01T00:00:00Z = 1672531200000
);

INSERT INTO spending(
  user_id,
  default_category,
  selected_category,
  account_id,
  subject,
  amount_spent,
  store_name,
  created_at_parsed
)
VALUES (
  1,
  'General',
  'Food',
  1,
  'Authorization on your credit account',
  25.00,
  'SAFEWAY',
  '1638316800000'
);

INSERT INTO spending(
  account_id,
  user_id,
  default_category,
  subject,
  amount_spent,
  store_name,
  created_at_parsed
)
VALUES (
  1,
  1,
  'General',
  'Authorization on your credit account',
  25.00,
  'Canadian Tire',
  '1639958400000'
);

-- Mock Data Entries for User 1 and Account 1
INSERT INTO spending(
  user_id,
  default_category,
  selected_category,
  account_id,
  subject,
  amount_spent,
  store_name,
  created_at_parsed
)
VALUES
  (1, 'General', 'Food', 1, 'Lunch at Restaurant', '15.00', 'Tasty Bites', '1628246400000'),
  (1, 'General', 'Entertainment', 1, 'Movie Tickets', '30.00', 'Cineplex', '1628092800000'),
  (1, 'General', 'Clothing', 1, 'New Dress', '75.00', 'Fashion Emporium', '1627886400000'),
  (1, 'General', 'Groceries', 1, 'Weekly Grocery Shopping', '95.00', 'SuperMart', '1627723200000'),
  (1, 'General', 'Transportation', 1, 'Train Fare', '5.50', 'Metro Rail', '1627569600000'),
  (1, 'General', 'Utilities', 1, 'Internet Bill', '60.00', 'WebConnect', '1627416000000'),
  (1, 'General', 'Food', 1, 'Dinner Delivery', '20.00', 'FoodExpress', '1627252800000'),
  (1, 'General', 'Entertainment', 1, 'Concert Tickets', '50.00', 'Live Arena', '1627099200000'),
  (1, 'General', 'Clothing', 1, 'New Shoes', '55.00', 'Shoe Haven', '1626945600000'),
  (1, 'General', 'Groceries', 1, 'Fresh Produce', '40.00', 'GreenGrocers', '1626792000000'),
  (1, 'General', 'Transportation', 1, 'Bus Pass', '25.00', 'City Transit', '1626638400000'),
  (1, 'General', 'Utilities', 1, 'Water Bill', '35.00', 'Aquafix', '1626484800000'),
  (1, 'General', 'Food', 1, 'Dinner at Cafe', '18.00', 'Cafe Delight', '1626331200000'),
  (1, 'General', 'Entertainment', 1, 'Amusement Park', '70.00', 'Joyland', '1626177600000'),
  (1, 'General', 'Clothing', 1, 'Accessories', '30.00', 'Accessory World', '1626024000000'),
  (1, 'General', 'Food', 1, 'Breakfast', '10.00', 'Morning Delights', '1625870400000'),
  (1, 'General', 'Groceries', 1, 'Snacks', '25.00', 'Snack Haven', '1625716800000'),
  (1, 'General', 'Transportation', 1, 'Taxi Ride', '15.00', 'QuickRide', '1625563200000'),
  (1, 'General', 'Entertainment', 1, 'Concert Merchandise', '40.00', 'Music Merch Store', '1625409600000'),
  (1, 'General', 'Food', 1, 'Dinner at Restaurant', '28.00', 'Gourmet Eats', '1625256000000'),
  (1, 'General', 'Groceries', 1, 'Grocery Haul', '90.00', 'MegaMart', '1625102400000'),
  (1, 'General', 'Transportation', 1, 'Train Tickets', '12.00', 'Metro Rail', '1624948800000'),
  (1, 'General', 'Food', 1, 'Snacks', '8.50', 'Snack Haven', '1624795200000'),
  (1, 'General', 'Clothing', 1, 'Casual Outfit', '50.00', 'Casual Styles', '1624641600000'),
  (1, 'General', 'Groceries', 1, 'Fresh Produce', '35.00', 'GreenGrocers', '1624488000000'),
  (1, 'General', 'Transportation', 1, 'Bus Pass', '25.00', 'City Transit', '1624334400000'),
  (1, 'General', 'Food', 1, 'Dinner Delivery', '22.00', 'FoodExpress', '1624180800000'),
  (1, 'General', 'Entertainment', 1, 'Movie Night', '28.00', 'Cineplex', '1624027200000'),
  (1, 'General', 'Groceries', 1, 'Weekly Grocery Shopping', '105.00', 'SuperMart', '1623873600000'),
  (1, 'General', 'Transportation', 1, 'Taxi Ride', '18.00', 'QuickRide', '1623720000000'),
  (1, 'General', 'Food', 1, 'Lunch at Cafe', '12.00', 'Cafe Delight', '1623566400000');

