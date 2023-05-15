import React from "react";
import "./404.scss";

const Page404 = () => {
  return (
    <div className="error404-container" style={{ margin: "auto auto" }}>
      <h1>{"Error 404. Page does not exist :("}</h1>
      <br />
      <h2>Page not found. You can use the navbar to go to a page.</h2>
    </div>
  );
};

export { Page404 };
