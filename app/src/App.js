import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import Home from "./pages/Home";
import Shows from "./pages/Shows";
import Reviews from "./pages/Reviews";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/reviews">Look at reviews</Link>
          </li>
          <li>
            <Link to="/shows">Review a TV show</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shows" element={<Shows />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
