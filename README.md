# Overview
Come to my picnic party!

To RSVP (spots limited! act fast) simply fill out the provided form on the page:
<img src="/images/form.png" /> 

If you're stuck on what to bring, the picnic wizard can help!
<img src="/images/wizard.png" /> 

See you there 👋

# TechStack

- Frontend: React
- Backend: Node.js Express.js Sequelize Sqlite

API used for the picnic wizard: https://spoonacular.com/food-api/docs

# How to Run the Application
1. Make a free account on https://spoonacular.com/food-api/pricing
2. Once logged in, copy the apikey from API Console > Profile > APIKey
3. Create a .env file inside 'react-node-app/client' and add the following line
```
REACT_APP_API_KEY = your_apikey
```
4. Save file
5. In your terminal, execute the following:
```
cd react-node-app/server
npm install
npm start
```
6. In another terminal, execute the following:
```
cd react-node-app/client
npm install
npm start
```

# Next Steps/Areas of Improvement
1. Restrict entries to one per person
- Currently a person can fill out the form as many times as they want. A potential improvement would be to add an email field in the form and check if entries have been made with that email before accepting the form submission.

2. Display the recipe suggested by the Picnic Wizard
- Since Spoonacular provides an endpoint to get the full recipe information, it'd be cool to display the whole recipe within the Picnic Wizard card.

3. Handle text overflowing out of the picnic blanket background image
- After a certain number of attendees, the text starts to overflow out of the image. To prevent this, the image should be made to resize dynamically.
