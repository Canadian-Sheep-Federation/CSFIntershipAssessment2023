$(document).ready(function () {
    //Get the search form and add a submit event listener
    $("#search-form").on("submit", function (e) {
        e.preventDefault(); //prevent the default action

        const query = $("#search").val();   //get the value of the search field
        searchBooks(query); //call the searchBooks() method passing in the search query
    });

    // Add click event listener on add comment button
    $("#results").on("click", ".add-comment-btn", function () {
        // get the data-book-id attribute from the clicked element and set it to bookId
        const bookId = $(this).data("book-id");
        //set the value of the book-id input field to the bookId
        $("#book-id").val(bookId);
        //show the comment modal
        $("#comment-modal").modal("show");
    });

    //Add submit event listener on the comment form  
    $("#comment-form").on("submit", function (e) {
        e.preventDefault();

        submitComment();    //call the submitComment() method 
    });

    //Add click event listener on the view comments button
    $("#results").on("click", ".view-comments", function () {
        //get the data-id attribute(book-id) from the clicked element
        let bookId = $(this).data("id");
        //get the list group which holds comments for current book
        let commentsContainer = $(this).siblings(".comments-container");
        
        //check if the list group is visible
        if (commentsContainer.is(":visible")) {
            //if visible, hide it
            commentsContainer.hide();
        } else {
            //make an ajax call the api using /GET/{id}
            $.ajax({
                url: "api.php/"+bookId,
                type: "GET",
                success: function (data) {
                    console.log(data);
                    let html = "";
                    //check if no comments yet
                    if(data.length === 0) {
                        html += `<div class="comment">
                                    <p>No comments yet.</p>
                                </div>`;
                    }else{
                        //iterate through each comment and generate the HTML
                        data.forEach((comment) => {
                        html += `<div class="comment">
                                    <p><strong>${comment.username}</strong> - ${comment.comment}</p>
                                </div>`;
                    });
                    }
                    //update comments container with generated html
                    commentsContainer.html(html);
                    //show the comments container
                    commentsContainer.show();
                },
                error: function () {
                    alert("An error occurred while fetching comments.");
                },
            });
        }
    });

});

//Add click event listener on the view all comments button
$("#view-all-comments").on("click", function () {
    //check if the comments-container is visible
    if ($(".comments-container").is(":visible")) {
        $(".comments-container").hide();
    } else {
        //make an ajax call to the api using /GET
        $.ajax({
        url: "api.php",
        type: "GET",
        success: function (data) {
            //Object to hold all comments grouped by their respective book_id
            const commentsByBookId = {};

            // iterate through each comment and update the commentsByBookId object
            data.forEach((comment) => {
                if (!commentsByBookId[comment.book_id]) {
                commentsByBookId[comment.book_id] = [];
                }
                commentsByBookId[comment.book_id].push(comment);
            });
            // console.log(commentsByBookId);

            // iterate through each book card in results and update its comments html
            $(".book-card").each(function () {
                //get the book id from the add comment button
                let bookId = $(this).find(".add-comment-btn").data("book-id");
                //get the comments container of the current book card
                const commentsContainer = $(this).find(".comments-container");
                // console.log(bookId);
                
                // check if comments exist for the current book card
                if (commentsByBookId[bookId]) {
                    let html = "";
                    //generate the html for each comment
                    commentsByBookId[bookId].forEach((comment) => {
                        html += `<div class="comment">
                                    <p><strong>${comment.username}</strong> - ${comment.comment}</p>
                                </div>`;
                    });
                    commentsContainer.html(html);
                } else {
                    //update the comments container with a message indicating no comments yet
                    commentsContainer.html("<p>No comments yet.</p>");
                }
                //show the comments container
                commentsContainer.show();
            });
        },
        error: function () {
            alert("An error occurred while fetching all comments.");
        },
        });
    }
});

//Fetch books and display them
function searchBooks(query) {
    //get the api url and pass the query param
    const apiUrl = "https://openlibrary.org/search.json?q=" + encodeURIComponent(query);
    // make an ajax call to the api
    $.ajax({
        url: apiUrl,
        type: "GET",
        success: function (data) {
            // call the displayResults() method and pass the requested book results
            displayResults(data.docs);
        },
        error: function (error) {
            console.error("Error fetching data:", error);
        },
    });
}

//Display the results in a card layout
function displayResults(books) {
    if (books.length === 0 || books === undefined || books === null) {
        //if no books found, display an appropriate message
        $("#results").append("<p>No results found</p>");
        return;
    } else {
        let html = "";
        //iterate through each book result and generate the html card
        books.forEach((book) => {
            html += `
            <div class="book-card card">
                <div class="card-body">
                    <h3 class="card-title">${book.title}</h3>
                    <p class="card-text">Author: ${book.author_name ? book.author_name.join(", ") : "Unknown"}</p>
                    <button class="add-comment-btn btn btn-outline-primary btn-sm" data-book-id="${book.key}">Add Comment</button>
                    <button class="view-comments btn btn-outline-secondary btn-sm" data-id="${book.key}">View Comments</button>
                    <div class="comments-container mt-3" style="display: none;">
                        <h4 class="mb-3">Comments:</h4>
                        <div class="list-group"></div>
                    </div>
                </div>
            </div>`;
        });
        //update the results div with the generated html cards
        $("#results").html(html);
    }
}

// Submit comment for a book
function submitComment() {
    // Get book id, username and comment from the form
    const bookId = $("#book-id").val();
    const username = $("#username").val();
    const comment = $("#comment").val();

    // Make a POST request to the API endpoint
    $.ajax({
        url: "api.php",
        type: "POST",
        data: JSON.stringify({
            book_id: bookId,
            username: username,
            comment: comment
        }),
        contentType: "application/json",
        success: function (data) {
            if(data.length === 0) {
                alert("An error occurred while submitting the comment.");
            }else{
                alert("Comment submitted successfully!");
            }
            // Hide the modal
            $("#comment-modal").modal("hide");
        },
        error: function () {
            alert("An error occurred while submitting the comment.");
        },
    });
}