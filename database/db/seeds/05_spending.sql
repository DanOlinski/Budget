INSERT INTO spending(
  user_id,
  account_id,
  subject, 
  amount_spent,
  store_name,
  created_at_parsed
)
VALUES (
  1,
  1, 
  'Authorization on your credit account', 
  25.00, 
  'SAFEWAY',
  '1688169600000' --parsed from 2023-07-01T00:00:00Z (ISO format). if you want to use other parsed dates to compare: '2023-06-01T00:00:00Z' =1685577600000 and '2023-08-01T00:00:00Z' = 1690848000000
);

INSERT INTO spending(
  user_id,
  selected_category,
  account_id,
  subject, 
  amount_spent,
  store_name,
  created_at_parsed
)
VALUES (
  1,
  'Food',
  1, 
  'Authorization on your credit account', 
  25.00, 
  'SAFEWAY',
  '1688169600000'
);

INSERT INTO spending(
  account_id,
  user_id,
  subject, 
  amount_spent,
  store_name,
  created_at_parsed
)
VALUES (
  1,
  1,
  'Authorization on your credit account', 
  25.00, 
  'Canadian Tire',
  '1688169600000'
);