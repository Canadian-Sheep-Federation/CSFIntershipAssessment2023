import React, { Component } from "react";

class Reviews extends Component {
  state = {
    reviews: [],
  };
  render() {
    return (
      <div>
        <br/>
        <button>Get all reviews</button>
        <br/>
        <input type="text" placeholder="Show..."/>
        <button>Get all reviews by show</button>
        <br/>
        <input type="text" placeholder="id..."/>
        <button>Get review by id</button>
      </div>
    );
  }
}

export default Reviews;
