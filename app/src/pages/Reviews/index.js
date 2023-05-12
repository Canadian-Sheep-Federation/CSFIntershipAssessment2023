import React, { Component } from "react";
import axios from "axios";

// Review component where user can view all reviews
class Reviews extends Component {
  state = {
    reviews: [], // List of reviews
    id: "", // Current id being searched for
  };

  // Makes GET call to server to get all reviews
  handleAllReviews = () => {
    axios
      .get("http://localhost:8000")
      .then((res) => this.setState({ reviews: res.data }))
      .catch((err) => alert(err));
  };

  // Makes GET/{id} call to server to get review by id
  handleReviewByID = (event) => {
    event.preventDefault();
    axios
      .get(`http://localhost:8000/${this.state.id}`)
      .then((res) => this.setState({ reviews: [res.data] }))
      .catch((err) => alert(err));
  };

  // Removes all the reviews being viewed
  handleClear = () => {
    this.setState({ reviews: [], id: "" });
  };

  // Function to change the state id as user types one in
  handleChangeID = (event) => {
    this.setState({ id: event.target.value });
  };

  render() {
    return this.state.reviews.length ? (
      /* Conditional rendering depending on whether state has reviews */ <>
        <button onClick={this.handleClear}>Clear reviews</button>
        {this.state.reviews.map((review) => (
          <div key={review.id}>
            <hr />
            <p>Review ID: {review.id}</p>
            <p>
              Show name: <b>{review.showName}</b>
            </p>
            <p>Summary: </p>
            <div dangerouslySetInnerHTML={{ __html: review.summary }} />
            <p>Review:</p>
            <p>
              <div style={{ whiteSpace: "pre-wrap" }}>{review.review}</div>
            </p>
            <hr />
          </div>
        ))}
      </>
    ) : (
      <div>
        <br />
        <button onClick={this.handleAllReviews}>Get all reviews</button>
        <br />
        <form onSubmit={this.handleReviewByID}>
          <label>Search review by ID:</label>
          <input
            type="text"
            value={this.state.id}
            onChange={this.handleChangeID}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Reviews;
