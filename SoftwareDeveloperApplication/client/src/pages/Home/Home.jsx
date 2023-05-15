import React from "react";
import "./Home.scss";
// separate the activity suggester piece of the home page into a component for easier debugging and cleaner code
import { ActivitySuggester } from "../../components/ActivitySuggester/ActivitySuggester";

const PageHome = () => {
  return (
    <>
      <div className="home-page">
        <div className="home-container">
          <div className="home-information">
            <h1>Welcome to the activity suggestion app!</h1>
            <br></br>
            <p>
              Using the public{" "}
              <a style={{ color: "#eb4" }} href="https://www.boredapi.com/">
                Bored API
              </a>{" "}
              you can look at a large number of activities in many different
              catagories, group sizes, prices, and accessibility levels. <br />{" "}
              You can also save these activities and rate them from 1 - 10 on
              how likely you are to do them.
            </p>
          </div>
          <ActivitySuggester />
        </div>
      </div>
    </>
  );
};

export { PageHome };
