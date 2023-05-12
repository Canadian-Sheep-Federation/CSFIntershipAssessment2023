import React, { useState, useRef, useEffect } from "react";
import { getShowSurveys, sumbitSurveyEntry } from "../api/requests";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { SurveyEntry } from "../components/SurveyEntry";
import "./SurveyPage.css";
import "./BasePage.css";

export const SurveyPage = () => {
  const [surveys, setSurveys] = useState([]);
  const emailRef = useRef();
  const showNameRef = useRef();
  const ratingRef = useRef();
  const idSearchBarRef = useRef();

  const navigate = useNavigate();

  // function to be called by button press
  const buttonAction = () => {
    navigate("/");
  };

  // Handles enter key press in id search bar (Calls get request to obtain existing surveys)
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getShowSurveys({ id: idSearchBarRef.current.value }, setSurveys);
    }
  };

  // Handles Form Submit (Calls post request to submit survey entry)
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const payload = { email: emailRef.current.value, showName: showNameRef.current.value, rating: ratingRef.current.value };

    sumbitSurveyEntry(payload);

    // Revert back to default values
    emailRef.current.value = ""
    showNameRef.current.value = ""
    ratingRef.current.value = ""
  };

  // Get all existing survey entries at first navigation of the page
  useEffect(() => {
    if (idSearchBarRef.current.value === "") {
      getShowSurveys({ id: null }, setSurveys);
    }
  }, [idSearchBarRef]);

  return (
    <div className="survey-page">
      <div className="survey-page-container">
        <div className="title-container">
          <h1>Surveys</h1>
          <Button text={"Go Back To Shows Search"} action={buttonAction} />
        </div>
        <div className="survey-page-content-container">
          {/* Survey Form */}
          <form className="survey-form" onSubmit={handleFormSubmit}>
            {/* Email */}
            <div className="survey-input-container">
              <label>Email:</label>
              <input type="email" ref={emailRef} required></input>
            </div>
            {/* Show Name */}
            <div className="survey-input-container">
              <label>Show Name:</label>
              <input type="text" ref={showNameRef} required></input>
            </div>
            {/* Rating */}
            <div className="survey-input-container">
              <label>Rating:</label>
              <input type="number" step="0.01" ref={ratingRef} required></input>
            </div>
            <input className="survey-form-submit" type="submit" />
          </form>
          <div className="survey-entries-container">
            {/* Existing Survey Entries List */}
            <h2>Existing Survey Entries</h2>
            <div className="search-bar-container">
              <h3>Search For Id:</h3>
              <input
                ref={idSearchBarRef}
                onKeyDown={(e) => handleKeyDown(e)}
              ></input>
            </div>
            <div className="survey-entries-list-container">
              {surveys.map((data) => (
                <SurveyEntry data={data} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
