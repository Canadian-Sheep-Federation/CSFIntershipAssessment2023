const search_results_div = document.getElementById("search_results");
const imdb_search_query_input  =document.getElementById("imdb_search_query")
const imdb_search_button = document.getElementById("imdb_search_button")
const name_input = document.getElementById("name_input")
const rating_input = document.getElementById("rating_input")
const description_input = document.getElementById("description_input")
const posted_data_div = document.getElementById("posted_data")
const all_data_div = document.getElementById("all_data")
const id_input = document.getElementById("id_input")
const specific_data_div = document.getElementById("specific_data")
const myAPI = "http://localhost:3500/"

async function postData () {
    let rating = parseInt(rating_input.value)
    let movie_name =name_input.value
    let description = description_input.value
    if (rating && movie_name && description){
        const review = {
        rating: rating,
        movieName: movie_name,
        text: description
        }
    
        const response = await fetch(myAPI, {
        method: "POST",
        body: JSON.stringify(review),
        headers: {
            "Content-Type": "application/json"
        }
        })
    
        if (!response.ok) {
        throw new Error(`Request failed with status ${reponse.status}`)
        }
        console.log("Request successful!")
        posted_data_div.innerHTML = "Posted"
        }
    else{
        posted_data_div.innerHTML = ""
        posted_data_div.innerHTML = "All fields are required"
    }
  }
async function getAllData(){
    const response = await fetch(myAPI)
    let text = await response.json()
    console.log(text)
    all_data_div.innerHTML = ""
    for (let i = 0; i < text.length; i++){
        let review = text[i]
        let review_div = document.createElement("div")
        review_div.classList.add("review")
        let id_p = document.createElement("p")
        id_p.innerText = review._id
        let movie_p = document.createElement("p")
        movie_p.innerText = review.movieName
        let rating_p = document.createElement("p")
        rating_p.innerText = review.rating
        let description_p = document.createElement("p")
        description_p.innerText = review.text
        review_div.appendChild(id_p)
        review_div.appendChild(movie_p)
        review_div.appendChild(rating_p)
        review_div.appendChild(description_p)
        all_data_div.appendChild(review_div)
    }
}
async function getSpecificData(){
    if (id_input.value){
        const response = await fetch(myAPI + id_input.value)
        let text = await response.json()
        console.log(text)
        specific_data_div.innerHTML = ""
        let review = text[0]
        let review_div = document.createElement("div")
        review_div.classList.add("review")
        let id_p = document.createElement("p")
        id_p.innerText = review._id
        let movie_p = document.createElement("p")
        movie_p.innerText = review.movieName
        let rating_p = document.createElement("p")
        rating_p.innerText = review.rating
        let description_p = document.createElement("p")
        description_p.innerText = review.text
        review_div.appendChild(id_p)
        review_div.appendChild(movie_p)
        review_div.appendChild(rating_p)
        review_div.appendChild(description_p)
        specific_data_div.appendChild(review_div)
    }
    else{
        specific_data_div.innerHTML = "Field Required"
    }
}
async function getDataFromIMDB(){
    if (imdb_search_query_input.value){
        let fetch_query = "https://imdb-api.com/en/API/SearchMovie/k_3piv535g/" + imdb_search_query_input.value;
        const response = await fetch(fetch_query)
        console.log("loading")
        if (!response.ok) {
        throw new Error(`Request failed with status ${reponse.status}`)
        }
        console.log("Request successful!")
        let text = await response.json()
        console.log(text.results)
        if (text.results[0].image){
            let img = document.createElement("img")
            img.src = text.results[0].image
            img.height = 300
            search_results_div.innerHTML = ""
            search_results_div.appendChild(img)
        }
        else{
            search_results_div.innerHTML = ""
            search_results_div.innerHTML = "Image doesn't exist for this query"
        }
    }
    else{
        search_results_div.innerHTML = ""
        search_results_div.innerHTML = "Please input a movie"
    }
}

