$(document).ready(function () {
    $("#search-form").on("submit", function (e) {
        e.preventDefault();
        const query = $("#search").val();
        searchBooks(query);
    });
    $("#results").on("click", ".add-comment-btn", function () {
        console.log("clicked");
        const bookId = $(this).data("book-id");

        $("#book-id").val(bookId);
        $("#comment-modal").modal("show");
    });

    $("#comment-form").on("submit", function (e) {
        e.preventDefault();
        submitComment();
    });

    $("#results").on("click", ".view-comments", function () {
        const bookId = $(this).data("id");
        const commentsContainer = $(this).siblings(".comments-container");
        if (commentsContainer.is(":visible")) {
            commentsContainer.hide();
        } else {
            $.ajax({
                url: "api.php/"+bookId,
                type: "GET",
                success: function (data) {
                    console.log(data);
                    let html = "";
                    if(data.length === 0) {
                        html += `<div class="comment">
                                    <p>No comments yet.</p>
                                </div>`;
                    }else{
                        data.forEach((comment) => {
                        html += `<div class="comment">
                                    <p><strong>${comment.username}</strong> - ${comment.comment}</p>
                                </div>`;
                    });
                    }
                    commentsContainer.html(html);
                    commentsContainer.show();
                },
                error: function () {
                    alert("An error occurred while fetching comments.");
                },
            });
        }
    });

});
$("#view-all-comments").on("click", function () {
    if ($(".comments-container").is(":visible")) {
        $(".comments-container").hide();
    } else {
        $.ajax({
        url: "api.php",
        type: "GET",
        success: function (data) {
            const commentsByBookId = {};

            data.forEach((comment) => {
                if (!commentsByBookId[comment.book_id]) {
                commentsByBookId[comment.book_id] = [];
                }
                commentsByBookId[comment.book_id].push(comment);
            });
            console.log(commentsByBookId);
            $(".book-card").each(function () {
                let bookId = $(this).find(".add-comment-btn").data("book-id");
                const commentsContainer = $(this).find(".comments-container");
                console.log(bookId);
                if (commentsByBookId[bookId]) {
                    let html = "";
                    commentsByBookId[bookId].forEach((comment) => {
                        html += `<div class="comment">
                                    <p><strong>${comment.username}</strong> - ${comment.comment}</p>
                                </div>`;
                    });
                    commentsContainer.html(html);
                } else {
                    commentsContainer.html("<p>No comments yet.</p>");
                }
                commentsContainer.show();
            });
        },
        error: function () {
            alert("An error occurred while fetching all comments.");
        },
        });
    }
});
function searchBooks(query) {
    const apiUrl = "https://openlibrary.org/search.json?q=" + encodeURIComponent(query);
    $.ajax({
        url: apiUrl,
        type: "GET",
        success: function (data) {
            displayResults(data.docs);
        },
        error: function (error) {
            console.error("Error fetching data:", error);
        },
    });
}

function displayResults(books) {
    if (books.length === 0) {
        $("#results").append("<p>No results found</p>");
        return;
    } else {
        let html = "";
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
        $("#results").html(html);
    }
}

function submitComment() {
    const bookId = $("#book-id").val();
    const username = $("#username").val();
    const comment = $("#comment").val();

    $.ajax({
        url: "api.php", // Replace with your API endpoint
        type: "POST",
        data: JSON.stringify({
            book_id: bookId,
            username: username,
            comment: comment
        }),
        contentType: "application/json",
        success: function (data) {
            alert("Comment submitted successfully!");
            $("#comment-modal").modal("hide");
        },
        error: function () {
            alert("An error occurred while submitting the comment.");
        },
    });
}