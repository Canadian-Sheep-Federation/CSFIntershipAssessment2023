import React from "react";

import "./Navbar.scss";
import bob from "../../assets/bob.jpg";
import { pages } from "../../utils/pages";
import { Link, useLocation } from "react-router-dom";

/**
 * Add all of visible pages to the navbar
 */
const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <div className="navbar-container">
      <div className="navbar-main">
        <Link to={"/"}>
          <img className="navbar-info-logo" src={bob} />
        </Link>

        {pages.main.map((page) => {
          return (
            <Link
              to={pathname === page.path ? {} : page.path}
              key={page.path}
              style={pathname === page.path ? { pointerEvents: "none" } : {}}
            >
              <div className="navbar-sub-container" key={page.path}>
                <div className="navbar-link"> {page.label} </div>
                {pathname === page.path ? (
                  <div className="underline-page-selected"></div>
                ) : (
                  <div className="navbar-underline"></div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export { Navbar };
