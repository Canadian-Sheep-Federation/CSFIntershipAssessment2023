# Background
This is a TV shows search application which retrieves data from the TVMaze API (https://www.tvmaze.com/api). The web application is built using React and the backend server is built using 
Express and Node.js.

It allows users to search TV Shows using a search bar and will list out the corresponding details of shows related to the search term.

# Deployment

To deploy the backend express server, follow these steps:

1. cd in to the ./app folder
2. cd in to the ./backend folder
3. In the terminal, run "npm install" to install the dependencies
4. Once dependencies are installed, run "npm start" to launch the server

To deploy the frontend web application, follow these steps:

1. cd in to the ./app folder
2. cd in to the ./frontend folder
3. In the terminal, run "npm install" to install the dependencies
4. Once dependencies are installed, run "npm start" to launch the react web application

# Features

Once in the home page of the web application, you can type in a tv show such as "breaking bad", "ozark" or "better call saul" and then press the enter key which will call the public api
and list out the results.

In the top right corner of the home page, you will see a "Take Survey" button, which will take you to the surveys page to interact with the express backend api. You can view and search for a specific id for a survey entry, or see all existing survey entries as well. In the left side of the page, there is a form to submit your own survey entry, which can be seen after refreshing the page on the right side of the page.

# Extensions and Improvements

For the web application:

1. **Content** - Another api that provides movie data could be added on to this application to support showing movie information as well. The TVMaze api also holds the list of episodes for each 
show, which could be shown in a modal which is produced by clicking on a show result. A rating system could also be integrated.
2. **Users** - Supporting user login and sign up could allow for a more personalized experience, where users could bookmark certain shows.
3. **UI and Design** - The UI and design of the web application could be improved, possibly by using an external UI library.
4. **Error Handling** - Currently, there is no error message that is shown when a search term does not produce any results from the api. That can be added to improve user experience and limit
confusion.

For the backend API:
1. **Content** - To support additional content like user authentication, additional endpoints will need to be added.
