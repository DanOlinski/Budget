# Budget App - Track Your Expenses

## Project Description
The Budget app has been built with the primary scope of tracking your expenses and helping you create and stick to a budget. This application is able to track spending and other relevant information from any bank accounts linked. In order to provide a secure environment for the user's sensitive banking information, the application links to the email notifications received from a given bank instead of requiring direct bank information access. Users can assign their regular purchases to new or existing categories and in this way, track their daily spendings. They can also set spending limits per category in order to have a guideline of how much they should spend within a specific timeframe.

![Budget App](https://github.com/DanOlinski/Budget/blob/2c2edff110522e2fd76eeeeef8d787d161e5648b/media/BudgetApp.png)

## Built With

PostGreSQL - Database
Express.js - Back-End
React - Front-End

## Getting Started

### Installation

1. Clone the repo on your local machine

Above the list of files, click Code and copy the Clone HTTPS link on your clipboard.
In your local machine terminal, cd into the folder you would like to clone the repo in and run:

```
git clone https://github.com/DanOlinski/Budget
```

2. Open the cloned repo folder in VisualStudio Code or your code editor of choice.

3. Install the required NPM packages.

You will have to install the dependencies for the front-end and back-end server.
First cd into the budget-website folder and run:

```
npm install
```

Then cd into the database folder and run the same command.

4. Follow the instructions Setup and Create the DB in the database README.md file to set it up.

5. Run servers to get started.

Both the front-end and back-end servers have to be run simultaneously.
Open two terminals for that effect.

Cd in the database folder in the first terminal and run this command to start the back-end:
```
npm run local
```

Cd in the budget-website folder in the second terminal and run this command to start the front-end:
```
npm start
```

DISCLAIMER: The application is a proof of concept and has a specific use-case scenario at the moment for testing purposes. It is linked to one email account which contains ficticious banking email notifications, which mimick real-time banking notifications that can be set to be received from any given bank. In this way, the data imported in the app will be the same for any bank account linked. 

Follow the steps below to proceed with the use-case scenario built.

### Use-Case Scenario

1. On the home page, click 'Get Started Now'. This will bring you to the sign up page.

2. On the sign up page, input your email and chosen password and click 'Sign Up' in order to create a new account.

3. Once the account is created, you will be re-directed to the main dashboard page. No bank accounts are linked yet, so no data is displayed.

4. In order to import the data from the centralized email, head to https://outlook.live.com/ and sign in with the following credentials:

Email: final.project.lhl@outlook.com
Password: #Finalprojectlhl

5. Back in the application, click on the 'Add a New Account' button. A form will be displayed, prompting you to input a bank name and a unique token. 

- First, enter the bank name of your choice.
- For the token generation, head to https://developer.microsoft.com/en-us/graph/graph-explorer and make sure you are signed in with the credentials in the previous step. 
- On the main Graph Explorer page, click the button 'Access Token' to generate a unique token, which provides access to the account's emails and creates the connection between the application and the email from which the banking information will be obtained.
- Copy/paste the token in the form and click 'Submit'.

6. You now have your first account set up, but there doesn't seem to be any data.. To import the data, you will have to make a request for it by clicking on the 'Import Budget Details' button. A form will be displayed, which asks you to input the unique token again. The same token can be used here.

7. Upon completion of the request, the dashboard will be populated with the bank's spendings and information. The application obtains access to the account's emails and will scan each email for relevant banking information. This includes account balance statements and spending bank notifications for example. The information collected is the date and time of the transaction, the institution where the purchase has been made, the amount spent and the credit/debit card number used.

- The pie chart will display the total spending for the selected timeframe, which is initially set between the first of the month and the current day of the month. The dates can be adjusted to display the spending within any timeframe, as long as there is data recorded.
- The bank account information will display the last recorded account balance and the debit/credit cards linked to the account.

8. Click on 'Manage' button in the navigation bar to see your spending details and manage your spending categories. The spending displayed are the transactions recorded during the timeframe selected in the dashboard.

9. The application has three categories set up when first logging in. The General, Food and Transportation. categories. All the spendings will initially be set to the default category General.

10. The institutions box lists the different stores recorded on the banking transactions. By clicking on the box, a form opens up, which lets you categorize the stores you purchased from, in an existent category. This means that every time you would make a purchase to that specific store, the purchase will be tracked in the selected category. Ex: Choose to put all Tim Hortons purchases in the category Food.
Here, you can also change the default category. By updating it, all the spendings will be appended to your selected default.

11. Once a store is assigned to a category, all transactions will be displayed in it. To view the spending details for a given category, simply click on the box category. This will give you an overview of the spendings tracked and the total amount spent. It also displays the maximum budget assigned to it. You can update the budget limit as you wish by changing the input field and clicking 'Save.

12. If a category has exceeded the budget limit, its color will change to red.

13. To add a category, click on the + button. It will ask you to input the category name and budget limit. Click 'Save' to add it to your tracked categories.

## Usage

### Filter Spending By Dates
This feature included in the dashboard lets the user filter their spendings by a given timeframe and provides a visual of how much he has spent by category.

![Dashboard Chart](https://github.com/DanOlinski/Budget/blob/2c2edff110522e2fd76eeeeef8d787d161e5648b/media/DashboardChart.png)

### Add Multiple Bank Accounts
The user can add multiple bank accounts to track. It provides freedom to the user to decide which accounts they want to track, as well as centralizing the information when needed.

![Bank Accounts Management](https://github.com/DanOlinski/Budget/blob/2c2edff110522e2fd76eeeeef8d787d161e5648b/media/BankAccountsManagement.png)

### Manage Categories
The manage categories lets the user create new and/or update current categories. The app tracks the institutions where the user has spent money in the past and they can be assigned to specific categories. A budget limit can be set for each category and the app lets the user know when they have reached that limit. Having multiple categories which can be modeled to the user's needs, facilitates the spending tracking.

![Categories](https://github.com/DanOlinski/Budget/blob/2c2edff110522e2fd76eeeeef8d787d161e5648b/media/Categories.png)

![Manage Categories](https://github.com/DanOlinski/Budget/blob/2c2edff110522e2fd76eeeeef8d787d161e5648b/media/ManageCategories.png)

## Credits

This application has been built by Daniel Olinski Guterres and Eliza Galea.




