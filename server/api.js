/* 
Book Review Api that stores book review data for select books.
Provides 3 types of request:
  - Get book review by id
  - Get all book reviews
  - Post (store) a book review

Note: run on terminal to install all dependencies:
    npm i express
    npm i mongoose
    npm i cors
*/
const express = require('express')
const mongoose = require('mongoose')
const bookReview = require('./book-review-model.js')
const cors = require('cors')
const app = express()
const PORT = 5000

// cors middleware to allow communication between frontend and backend
app.use(cors())
// middleware to access json data 
app.use(express.json())

//routes
    // GET (ALL) endpoint which returns all book reviews
app.get('/', async(req, res) => {
    try {
        const reviews = await bookReview.find({})
        res.status(200).json(reviews)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }    
})

    // GET id endpoint which returns the book review with specified id
app.get('/:id', async(req, res) => {
    try {
        const {id} = req.params
        console.log(id)
        const review = await bookReview.findById(id)
        console.log(review)
        res.status(200).json(review)   
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

    // POST endpoint which stores a book review
app.post('/', async(req, res) => {
    try {
        console.log(req.body)
        const review = await bookReview.create(req.body)
        res.status(200).json(review.id)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})


// Connect to mongoDB and run the API
mongoose.
connect('mongodb+srv://admin:tcS8XWaWd10cIL1r@api.amadpqs.mongodb.net/Reviews?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to mongoDB')
    app.listen(PORT, () => {
        console.log("Book Review API running on port " + PORT)
    })
}).catch(()=> {
    console.log('mongoDB connection error')
})
