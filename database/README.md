# Database server
 This server holds the data that is displayed in the app, it is served separately from the client interface

## Setup
1. Install server dependencies using the `npm install` command from scheduler-api-server directory.
2. Create the database by following instructions below under "Create the DB" section 
3. Start the web server using the `npm start` command. The app will be served at <http://localhost:8000/>.
4. In the main server's package.json at the very end place the following: "proxy": `"http://localhost:8000"`. this will enable you to make API requests to the db server without exposing the entire url (hiding the location of your db). In this construction your database is a bit hidden but not fully protected from attacks, the correct way of protecting it would be to add an authentication barrier for every API request.

## Create the DB
1. start postgres with the command `startpostgres`
2. Create a database with the command `CREATE DATABASE budget;`.
3. run the command `npm run db:reset` to create the tables and insert data. This command is also used to reset the database

##############below is not edited yet########
## routs with data
- Days

`GET /api/days`

Response

```json
[
  {
    "id": 1,
    "name": "Monday",
    "appointments": [1, 2],
    "interviewers": [1, 2],
    "spots": 0
  }
]
```

- Appointments

`GET /api/appointments`

Response:

```json
{
  "1": {
    "id": 1,
    "time": "12pm",
    "interview": {
      "student": "Lydia Miller-Jones",
      "interviewer": 1
    }
  },
  "2": {
    "id": 2,
    "time": "1pm",
    "interview": {
      "student": "Archie Cohen",
      "interviewer": 2
    }
  }
}
```

`PUT /api/appointments/:id`

Body:

```json
{
  "interview": {
    "student": String,
    "interviewer": Number
  }
}
```

`DELETE /api/appointments/:id`

- Interviewers

`GET /api/interviewers`

Response:

```json
{
  "1": {
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  },
  "2": {
    "id": 2,
    "name": "Tori Malcolm",
    "avatar": "https://i.imgur.com/Nmx0Qxo.png"
  }
}
```