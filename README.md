# TV Show reviewer

This application lets the user search for tv shows using the public api https://www.tvmaze.com/api. The user can then write a review for the tv show they have searched. The user can also search for all reviews written using the application, or search for a specific review by ID.

# How to run
In one terminal, do the following:
```
cd app/backend
npm install
node server.js
```
Now the server is up and running.

In another terminal, do the following:
```
cd app/src
npm install
npm run start
```
Now the web application will open up and you can access it at http://localhost:3000/.

# How to use
There are 3 links. Home. Look at Reviews. Review a TV show. Click on each link to do the following.

Home: Just a placeholder home page with nothing in it.

Look at Reviews: This is where you can either see all reviews stored in the database. You can also search for reviews by ID.

Review a TV show: This is where you can search the public api to fill out a review for a TV show. Search the show you want to review, enter your review in the texbox area, then click submit. Now this review is in the database which you can search for.

# How the application and api could be extended and improved

1. Some sort of API authentication. This can help protect the API from untrusted users.
2. Add an endpoint to allow to search for other properites such as tv show name.
3. Add a rating field to review schema and allow to search by rating.
4. Allow to sort by rating (from highest to lowest, or lowest to highest).
5. Allow for updating reviews and deleting reviews.
6. Pictures of tv shows for UI when searching for tv shows.
7. More visually appealing UI.

# How the application and api should be deployed
We should first switch sqlite for another database as sqlite is file based. So we can switch from sqlite to mongoDB and deploy using heroku.
