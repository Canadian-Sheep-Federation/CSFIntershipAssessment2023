# Running the App

This app   allows users to retrieve a random facts about cats by using a public api. The user can provide a name and email address and using the retrieved fact as message save the email locally. The user can retrieve all the messages to be sent from local storage.  The frontend is in React and the api is in django. 

## Prerequisites

Before running the app, ensure that the following software is installed on your computer:

- [Python](https://www.python.org/downloads/) (version 3.6 or higher)
- [Node.js](https://nodejs.org/en/download/) (version 12 or higher)
- [npm](https://www.npmjs.com/get-npm) (version 6 or higher)

## API 
API Documentation

The API provides three endpoints to retrieve all factst, a fact with ID and add facts.

1. Get a fact by ID:

Endpoint: `/<fact_id>`

Method: `GET`

Parameters:

- `fact_id`: The ID of the fact to retrieve (required)

2. Get all facts
Endpoint: `/`

Method: `GET`

3. Add a fact:

Endpoint: `/fact`

Method: `POST`

Parameters:

- `fact`: The text of the cat fact to add (required)
- `name`: The name of the person to send the fact to  submitted the fact (required)
- `email`: The email address of the person who recieves  the cat  fact (required)

## Installation

1. Clone the repository 

2. Change into the project directory:

   ```
   cd your-repo
   ```

3. Install the Python dependencies by running the following command in your terminal:

   ```
   pip install -r requirements.txt
   ```

4. Install the Node.js dependencies by running the following command in your terminal:

   ```
   npm install
   ```

## Running the App

1. Start the Django backend API by running the following command in your terminal:

   ```
   python manage.py runserver
   ```

2. In a separate terminal window, start the React frontend by running the following command:

   ```
   npm start
   ```

3. Open your web browser and navigate to `http://localhost:3000` to view the app.

## Usage

Once the app is running, you can submit a form with name, email and retrieve a random fact data from the public API as message. The data will be stored in a SQLite database.

## License

This project is licensed under the terms of the [MIT license](https://opensource.org/licenses/MIT).