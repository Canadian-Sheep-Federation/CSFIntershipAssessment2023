import { BrowserRouter, useLocation, Route, Routes } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./App.scss";
import { pages } from "./utils/pages";
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";

export default function App() {
  // Use React router to ensure smooth transitions between pages
  return (
    <BrowserRouter>
      <TransitionRoutes />
    </BrowserRouter>
  );
}

const TransitionRoutes = () => {
  const location = useLocation();
  /**
   * Create overall structure of each page
   * Navbar
   * Page contents
   * Optional Footer
   */
  return (
    <TransitionGroup>
      <Navbar />
      {/* add CSS transition between pages */}
      <CSSTransition key={location.key} classNames="page" timeout={300}>
        {/* Use a septate file to manage all the pages in the frontend and iterate through it here to add all routes */}
        <Routes location={location}>
          {[...pages.main, ...pages.hidden].map((page) => {
            return (
              <Route
                path={page.path}
                key={page.path}
                element={
                  <>
                    <div style={{ minHeight: "100vh", paddingTop: "10vh" }}>
                      {page.component}
                    </div>
                    {page.includeFooter ? <Footer /> : <></>}
                  </>
                }
              />
            );
          })}
          {/* add a page for non existent route and give the users a 404 error. */}
          <Route
            path="*"
            element={
              <div style={{ minHeight: "100vh", paddingTop: "10vh" }}>
                {pages["404"].component}
              </div>
            }
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};
