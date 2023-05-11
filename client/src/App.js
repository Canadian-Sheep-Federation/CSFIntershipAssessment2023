/* Web APP to search, review and consult others' reviews to help
   decide what books to read/buy next.
*/

import React, { useState} from 'react'

const publicApiUrl = "https://openlibrary.org/search.json?title="    // url to search books with Open Library API
const RestApiUrl = "http://localhost:5000"                           // url to use GET/POST methods with self-made REST API


// APP
function App() {

  // STATES used by our app

  // State for the Search Book functionality which queries
  // the Open Library public API
  const [findBook, setFindBook] = useState("")
  const [bookData, setBookData] = useState()

  // Input states that tracks the input fields to review
  // books
  const [User, setUser] = useState("")
  const [Name, setName] = useState("")
  const [Rating, setRating] = useState()
  const [Comment, setComment] = useState("")
  // Id of review
  const [Id, setId] = useState("")

  // Reviews stored in database (mongoDB)
  const [Reviews, setReviews] = useState()       // All reviews
  const [Review, setReview] = useState()         // Last Review found by id
  const [SearchId, setSearchId] = useState()     // id used to search a specific review


  // FUNCTIONS used by our APP

  // Function to search Book using the findBook state as the Book Title
  const searchBook = () => {
    let url = publicApiUrl + findBook.replace(/\s/g, '+')  // the url format for Open Library requires each space to be replaced 
    fetch(url).then(                                       // by the character '+'
      response => response.json()                          // Next, fetch data (GET method)
    ).then( 
      data => {
        setBookData(data)
      }
    )

    // clear input box for next search
    setFindBook("")
  }

  // Function that calls the POST method of our self-made REST API
  const reviewBook = () => {
    let jsonData = {
      "user": User, "name": Name, "rating": Rating, "comment": Comment
    }
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(jsonData)
    }
    console.log(requestOptions)
    fetch(RestApiUrl + "/", requestOptions)
      .then(response => response.json())
      .then(data => setId(data))
  }

  // Function that calls the GET (all) method of our self-made REST API
  const getReviews = () => {
    setReviews()
    setReview()
    fetch(RestApiUrl + "/")
      .then(response => response.json())
      .then(data => setReviews(data))
    console.log(Reviews)
  }

  // Function that calls the GET (by ID) method of our self-made REST API
  const getReviewById = () => {
    setReviews()
    setReview()
    fetch(RestApiUrl + "/" + SearchId)
      .then(response => response.json())
      .then(data => setReview(data))
    console.log("review:")
    console.log(Review)
  }


  // Web Page DISPLAY

  return (
    /* Display on the Web page
       There are 3 main sections:
        - Search Book: to search book information given a book title (using the Open Library public API)
        - Review Book: to store book review in a mongoDB database (using self-made REST API)
        - See Reviews: to view book reviews (using self-made REST API)
    */
   <html>
    <div>
      <h1> Book Reviews Web App</h1>


      {/* 1. Search Book Section */}
      
      <h2>Search Book</h2>
      <input                                                            /* input box for Book Title */
        type="text"
        value={findBook}
        onChange={(e) => setFindBook(e.target.value)}
      />
      <button onClick={() => searchBook()}> Search </button>          {/* Button that gets book data via Open Library API */}
      {(typeof bookData === 'undefined') ? (                            // Displaying book information (or not)
        <p>No book to display</p>
      ): (
        <div>
          <pre>Title:      {bookData.docs[0].title}</pre>
          <pre>Author:     {bookData.docs[0].author_name}</pre>
          <pre>Published:  {bookData.docs[0].first_publish_year}</pre>
        </div>
      )
      }


      {/* 2. Review Book Section */}
 
      <h2>Review Book</h2>

        {/* 4 different input fields to collect relevant data for each Book Review */}
        <label for="user">Username: </label>                        {/* Username */}
        <input
          type="text"
          value={User}
          onChange={(e) => setUser(e.target.value)}
        />
        <br></br>
        <label for="name">Book Name: </label>                      {/* Book Title */}
        <input
          type="text"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <label for="rating">Rating: </label>                      {/* Rating (0 to 10) */}
        <input
          type="number"
          min="0"
          max="10"
          value={Rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <br></br>
        <label for="comment">Comments (optional): </label>        {/* Written Review/Comment */}
        <br></br>
        <textarea
          type="text"
          value={Comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <br></br>
        <button onClick={ () => reviewBook()}> Post review</button>    {/* Button that calls the POST method to store a Book Review */}
        <p>Previous review id: {Id}</p>                                {/* Displaying the id of the previous book review */}


      {/* 3. See Reviews Section */}

      <h2>See Reviews</h2>
        <button onClick={ () => getReviews()}>Display all reviews</button>  {/* Button that calls the GET (all) method of our API */}
        <br></br>
        <button onClick={ () => getReviewById()}>Find review by ID</button> {/* Button that calls the GET by ID method of our API */}
        <input                                                              /* Input area to collect id to search review with */
          type="text"
          value={SearchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        {(typeof Reviews === 'undefined') ? (                               /* Displaying all reviews (or not) */
            <p>Not displaying all reviews</p>
          ) : (
            Reviews.map((o, i) => <p key={i}>User: {Reviews[i].user}<br></br>Book Name: {Reviews[i].name}
              <br></br>Book Rating: {Reviews[i].rating}<br></br>Comment: {Reviews[i].comment}<br></br>
              Review id: {Reviews[i]._id}</p>
            )
          )
        }
        {(typeof Review === 'undefined') ? (                              /* Displaying review found by ID (or not) */
            <p>Not displaying review by id</p>
          ) : (
            <p>User: {Review.user}<br></br>Book Name: {Review.name}
              <br></br>Book Rating: {Review.rating}<br></br>Comment: {Review.comment}</p>
          )
        }
    </div>
  </html>
  )
}

export default App