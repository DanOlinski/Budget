# Budget App - Track Your Expenses

## Project Description
The Budget app has been built with the primary scope of tracking your expenses and helping you create budgets. This application is able to track spending and other relevant information from any bank accounts linked. In order to provide a secure environment for the user's sensitive banking information, the application links to the email notifications received from the bank instead of requiring direct bank information access. Users can assign their regular purchases to new or existing categories and in this way, track their daily budget. They can also set maximum budgets per category in order to have a guideline of how much they should spend within a specific timeframe.

## Getting Started

### Installation

1. Clone the repo
```
git clone https://github.com/DanOlinski/Budget
```

2. Install NPM packages
```
npm install
```

3. Copy .env.example in the database folder and input your database information.

4. Populate database.
```
npm run db:reset
```

5. Run the front-end and back-end servers.

In the database terminal, run:
```
npm run local
```

In the front-end (budget-website) terminal, run:
```
npm start
```

The application has one use-case at the moment for testing purposes. The spending and bank account information is requested from a centralized email that contains all the bank notifications. In order to import the relevant banking data in the app, a unique access token has to be generated in Graph Explorer every time the request is sent to the email.

Here is the information for the account used:

Email: final.project.lhl@outlook.com
Password: #Finalprojectlhl

6. Log in with the credentials below and generate token here: https//developer.microsoft.com/en-us/graph/graph-explorer

## Usage

### Filter Spending By Dates
This feature included in the dashboard lets the user filter their spendings by a given timeframe and provides a visual of how much he has spent by category.

### Add Multiple Bank Accounts
The user can add multiple bank accounts to track. It provides freedom to the user to decide which accounts they want to track, as well as centralizing the information when needed.

### Manage Categories
The user lets the user create new and/or update current categories. The app tracks the institutions where the user has spent money in the past and they can be assigned to specific categories. A budget limit can be set for each category and the app lets the user know when they have reached that limit. Having multiple categories which can be modeled to the user's needs, facilitates the spending tracking.

### Google Sheets

The user can also have access to a Google Sheets version which appends the information similarly to the app. This additional feature, however, is essential as it provides the user another dimension to the budget tracker. It can facilitate tax returns for example by tracking specific spendings over time.

## Credits

This application has been built by Daniel Olinski Guterres and Eliza Galea.



