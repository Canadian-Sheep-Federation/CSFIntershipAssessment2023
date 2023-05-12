# CSFInternship Software Developer Submission

Hi! 

For the Canadian Sheep Federation intern position, I decided to make a simple web application that queries the MeowFacts API to get random cat facts at a click of a button!

I also designed an API that allows users to submit their very own cat facts. Users also have the ability to see all submitted facts, or they can search for a specific fact by searching for it with the ID.

I decided to use Node.js and express because I have worked with it before and I enjoy using them. Although this was my first time using Sqlite, I found it very nice and easy to use. 

The API designed is very simple. it really only has a single function. When thinking about improvements, it can be extended to allow for more than just cat facts. It can also be used to surprise users with a random fact throughout the day!

As for deploying this web app, It can be done.. Since Sqlite is an embedded database, it can handle light to medium loads. Although concurrent writes to the database might be a problem, that would only really be a major issue if there is lots of traffic on the website. The web app could then be deployed using something like Heroku or Amazon AWS.

Thank you!

