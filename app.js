const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
let db;
/**
 * set the mongodb account: you can change it to your own databasse
 */
const client = new MongoClient(
  "mongodb+srv://todo:Cy520520.@cluster0.qercasm.mongodb.net/Trip?retryWrites=true&w=majority"
);
app.use(express.urlencoded({ extended: false }));

/**
 * connect to Mongodb
 */
async function start() {
  await client.connect();
  db = client.db();
  app.listen(3000);
}
start();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* This code block is handling a GET request to the root URL ("/"). It retrieves all the documents in
the "country" collection of the MongoDB database. The resulting array is then passed as a parameter to the HTML
 The HTML template includes a form to add a
new country to the database and a div to display the list of countries that have already been added.
 */
app.get("/", async (req, res) => {
  const country = await db.collection("country").find().toArray();
  res.send(`<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trip</title> 
  </head>
  <body>
    <div class="container">
      <h1 class="display-4 text-center py-1">Welcome!</h1>
      <p1>Create your travel journal</p1>
      <div class="jumbotron p-3 shadow-sm">
        <form id = "add" action="/add-country" method="post">
          <div class="d-flex align-items-center">
            <input id = "country" name = "country_name" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
            <button class="btn btn-primary">Add Country</button>
          </div>
        </form>
      </div>
      <div id = "country-list"class = "trip">
      </div>
    </div>
    <script>
    let countrys = ${JSON.stringify(country)}
    </script>
    <script src= "/server.js"></script>
  </body>
  </html>`);
});
/**
This code block is handling a POST request to add a new country to the database. It is using the
`fetch` function to make a request to the REST Countries API to get information about the country
specified in the request body. Once the response is received, it is converted to JSON and the
relevant information (name, capital, region, population, language, and flag) is extracted and
inserted into the `country` collection in the MongoDB database using the `insertOne` method. The
`countryhtml` function is then called to update the HTML page with the new country information.
Finally, the ID of the newly inserted document is returned. If there is an error, it is logged to
the console. */
app.post("/add-country", async function (req, res) {
  fetch(`https://restcountries.eu/rest/v2/name/${req.body.text}`)
    .then((response) => response.json())
    .then(async (data) => {
      const info = await db.collection("country").insertOne({
        name: data.name,
        capital: data.capital,
        region: data.region,
        population: data.population,
        language: data.languages.name,
        flag: data.flag,
      });
      countryhtml(data);
      return info._id;
    })
    .catch((error) => console.log(error));
});
/* This code block is handling a POST request to retrieve information about a specific country from the
MongoDB database. The request URL includes a parameter `:id` which is used to identify the specific
country to retrieve. The `findOne` method is used to find the document in the `items` collection
with the matching `_id` field. Once the document is retrieved, its information (name, region,
capital, population, language, and flag) is inserted into an HTML template and sent as a response to
the client. The HTML template includes a button to go back to the previous page. */
app.post("/:id", async (req, res) => {
  const info = await db
    .collection("items")
    .findOne({ _id: new ObjectId(req.body.id) });
  res.send(`<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Info</title> 
    </head>
    <body>
    <article class="list-group-country">
      <img class="img" src="${info.flag}"/>
      <div class="data>
      <h3 class = "name">${info.name}</h3>
      <h4 class = "region">${info.region}</h4>
      <h4 class = 'capital'>${info.capital}</h4>
      <h4 class = 'population'>${info.population}</h4>
      <h4 class = 'language'>${info.language}</h4>
      <form>
        <input type="button" value="Go back!" onclick="history.back()">
      </form>
    </div>
  </article>
    </body>
    </html>`);
});
