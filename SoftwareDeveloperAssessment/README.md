# Software Developer Assessment By Nithushan Selvanesan
# API
To use this API, please run the backend located in the API folder with npm start server.js. This will run the server and the database for the API on port 3000.
You can send GET and POST requests to the API at http://localhost:3000/
# Web Application
To run the web application, run python index.py which will start up the web server. Here you can enter a Poet's name, Poem and which line number that you would like to view.
This information will be stored on the backend and you will get an appropiate id to later view it again. You also get access to the poetrydb api which will retrieve that line of the poem and display it.
To view other forms, click the submit button to view other forms and you can provide an id to view a specific form
# Improvements
The API can be extended and improved by adding a better UI interface and the lines of previously searched poems can be stored to avoid excessive api calls since those present a bottleneck for the server.
Also, for the client sside, it may be better to store non-sensitive data in session storage so that there are less api calls to the backend for the same poem.
# Deployment
Preferably the API can be deployed in a server farm or a cluster so that we can do horizontal load balancing and make sure that there are more server programs to handle excessive load.
# Intuitive design
The API is pretty simple to use, however, perhaps some documentation desscribing it's usage and a better HTML layout would make it more appealing.