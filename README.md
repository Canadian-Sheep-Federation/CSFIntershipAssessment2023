CSF Intership Assessment 2023
# Weather API

This is a simple weather application built using React and the OpenWeather API. It allows users to search for weather information of different cities, view the current temperature, humidity, wind speed, and description. Users can also use their device's geolocation to get the weather information of their current location.
# Installation
Install dependencies and run commands:

react: "^17.0.2"
axios: "^0.24.0"
express
sqlite3
```
cd SabinasAssignment/backend
npm install
node api.js
```
Now the server is up and running.

# Usage

After starting the application, users can enter the name of the city they want to search for in the input field and press the "Search" button. They will be presented with the current weather information of the entered city.

Alternatively, users can click on the "location" button to get the weather information of their current location.
```
cd SabinasAssignment
npm install
npm  start
```
Now the web application will open up and you can access it at http://localhost:3000/.

# Endpoint
POST /form - This endpoint is used to create a new form in the database. The endpoint expects a JSON request body with fields for city, temperature, and description. The endpoint then inserts this data into the weather table in the database.

POST / - This endpoint is similar to the /form endpoint, but it does not use destructuring to extract the data from the request body. Instead, it retrieves the data using req.body.city, req.body.temperature, and req.body.description. This endpoint returns the ID of the newly created form.

GET /:id - This endpoint is used to retrieve a specific form from the database by its ID. The ID is passed as a parameter in the URL. If the form is found in the database, the endpoint returns the form data. Otherwise, it returns a 404 error.

GET / - This endpoint retrieves all forms from the database and returns them as an array of JSON objects.

