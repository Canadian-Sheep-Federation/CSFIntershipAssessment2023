# CSF Intership Assessment 2023

Hello the following is my submission for the 2023 CSF Internship Assessment!

I created a web app using:

- MongoDb
- Express.js
- React.js (with Vite.js)
- [Bored API](https://www.boredapi.com/)
- Docker

It is an activity suggestion app that lets you pick options for an activity and it will suggest one for you. You can then store this suggested activity in a database for later viewing.

# Frontend

The frontend is using Vite.js for server side loading to improve speed and efficiency. It has two pages `/home` & `/saved`. The home page allows the user to interact with the activity suggester component and to save and rate their favorite activities. The saved page lets the users look and sort all of their saved activities and mark them as done and subsequently delete them.

# Backend

The backend is running Express.js with Mongoose and MongoDB. The Mongoose schema allows for easy data validation and storing with MongoDB. The API has many different routes that are outlines in the `Routes.js` file. They include `GET "./", GET "./:id", GET "/*", POST "./", POST "./request", PUT "./done/:id", DELETE "./delete/:id"`.

# Docker

In this project I used docker to create containers for my web application and to create an instance of MongoDB.

# To start the project

## **Pleas ensure you have [yarn](https://yarnpkg.com/getting-started/install) and [Docker](https://www.docker.com/get-started/) installed.**

Navigate to:

```
cd ./SoftwareDeveloperApplication/client
```

and run

```
yarn install
```

Navigate to:

```
cd ./SoftwareDeveloperApplication/API
```

and run

```
yarn install
```

Then in `./SoftwareDeveloperApplication` run:

```
docker-compose up --build
```

# Bonus Points

## Discuss how the application and api could be extended and improved

There are many areas of improvement to this project:

### Frontend:

You could add Redux for better state management. Furthermore, the application is not the best to look at, so the user interface could be improved.

### Backend:

A user profile and login could be useful to allow each user to have their own set of data. You could add authentication with `Passport.js`. Additionally, the backend could be further separated into routes, controllers, services.

## Discuss how the application and api should be deployed

Since this application is set up using Docker it can be very easy to create Docker images and put them on a remote server registry and run the containers from there. For example, DigitalOcean has great integration with Docker and can be done easily through GitHub actions and SSH.

## Intuitive design and user interface

Due to the simplicity of this project the users can mostly figure things out based on trial and error since there aren't that many options. However, to further improve this there should be more clear messaging present for users such as pop ups to a guide upon first time entry.
