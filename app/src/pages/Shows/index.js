import React, { Component } from "react";
import axios from "axios";

const apiURL = "https://api.tvmaze.com/singlesearch/shows"; // API for searching for getting tv show data

// Shows component where user can use public api to search for a TV show and review it
class Shows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "", // Show being searched for
      reviewForm: { id: "", showName: "", summary: "" }, // Reivew form thats filled in by publi api
      review: "", // Review that user will enter in
    };
  }

  // Change state to reflect show user types in
  handleChange = (event) => {
    this.setState({ show: event.target.value });
  };

  // Change state to reflect review user types in
  handleChangeReview = (event) => {
    this.setState({ review: event.target.value });
  };

  // Call public api to search for tv show, then fill reviewForm state
  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(apiURL, { params: { q: this.state.show } })
      .then((res) => {
        this.setState({
          reviewForm: {
            id: res.data.id,
            showName: res.data.name,
            summary: res.data.summary,
          },
        });
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };

  // Make POST call to backend to submit review
  handleSubmitReview = (event) => {
    event.preventDefault();

    const req = {
      showName: this.state.reviewForm.showName,
      summary: this.state.reviewForm.summary,
      review: this.state.review,
    };

    axios
      .post("http://localhost:8000", req)
      .then((res) =>
        alert(
          `Review for ${res.data.showName} successfully created! ID of review: ${res.data.id}`
        )
      )
      .catch((err) => alert(err));

    this.setState({ show: "", review: "" });
    this.setState({
      reviewForm: { id: "", showName: "", summary: "" },
    });
  };

  render() {
    return this.state.reviewForm.id ? (
      /* Conditional rendering depending on a tv show has been searched */
      <div>
        Show: <b>{this.state.reviewForm.showName} </b>
        <br />
        <br />
        Summary:{" "}
        <div
          dangerouslySetInnerHTML={{ __html: this.state.reviewForm.summary }}
        />
        <br /> <br />
        <form onSubmit={this.handleSubmitReview}>
          <label>
            Enter your review: <br />
            <textarea
              name="postContent"
              rows={10}
              cols={60}
              value={this.state.review}
              onChange={this.handleChangeReview}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    ) : (
      <form onSubmit={this.handleSubmit}>
        <label>Enter TV show:</label>
        <input
          type="text"
          value={this.state.show}
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Shows;
