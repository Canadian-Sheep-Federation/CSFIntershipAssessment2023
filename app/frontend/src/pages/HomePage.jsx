import React, {useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { searchTVShows } from "../api/requests";
import { ShowInfo } from "../components/ShowInfo";
import { Button } from "../components/Button";
import "./HomePage.css";
import "./BasePage.css";

export const HomePage = () => {
  const [tvShows, setTVShows] = useState([]);
  const searchBarRef = useRef();
  const navigate = useNavigate();

  // Handles enter key press in search bar
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchTVShows({searchString: searchBarRef.current.value}, setTVShows);
    }
  }

  // function to be called by button press
  const buttonAction = () => {
    navigate("/survey")
  }

  return (
    <div className="home-page">
      <div className="home-page-container">
        <div className="title-container">
          <h1>TV Shows</h1>
          <Button text={"Take Survey"} action={buttonAction} />
        </div>
        <div className="home-page-content-container">
          <div className="search-bar-container">
            <h3>Name of TV Show:</h3>
            <input ref={searchBarRef} onKeyDown={(e) => handleKeyDown(e)}></input>
          </div>
          <div className="tv-shows-list-container">
            {tvShows.map((data) => (
              <ShowInfo data={data}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
