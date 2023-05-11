# CSF Internship Assessment 2023

A web application that suggests excuses to use for specific categories and allows users to submit their own excuses as well. It is based on the Excuser API (https://excuser-three.vercel.app/). 

The backend is implemented using Node.js and Express.js. The frontend is implemented using React and Bootstrap. 

# Features
1. **Home Page:** Displays up to 10 excuses for a given category. By default, 10 excuses are displayed from random categories. 
<img src="/images/Home.png" /> 

2. **Create Excuse:** A user can submit an excuse for a particular category. 
<img src="/images/Create Excuse.png" /> 

3. **View Submitted Excuses:** Displays submitted excuses. Can filter based on a specific ID.
<img src="/images/View Excuses.png" /> 

# Running the Applicaton 
1. Download the code and open two separate terminals 
2. In the first terminal, start the server by executing the following:
```
cd backend
npm install 
npm start
```
3. In the second terminal, start the frontend by executing the following:
```
cd frontend 
npm install 
npm start
```

# Extensions and Improvements
1. **User Authentication:** User login and authentication can enable users to see excuses they have posted and ones that they have interacted with (viewed, liked/rated, etc.)
2. **Review/Rate Excuses:** Authenticated users can rate/like certain excuses that they might want to save for the future. Users can then view all their liked excuses.  
3. **Improved Searching Abilities:** Currently, users can only get randomized excuses based on the category. A potential improvement would be to allow users to search for specific keywords and then using fuzzy matching to display excuses with those keywords. 
4. **UI upgrades:** The UI is pretty simple at the moment. To make improvements, icons can be added for each category, certain font weights (like the ones for input labels) can be made larger/bolder, different background colours can be used etc. 
5. **Increasing Number of Excuses and Categories:** This is a limitation of the external public API since they have approximately 10 excuses per category and a limited number of categories. However, having more categories and excuses would provide more variety for users. 


:)
