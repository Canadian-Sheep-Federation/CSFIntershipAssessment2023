import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Form from './components/Form';
import Messages from './components/Messages';
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/form">Send a random cat fact email</Link>
            </li>
            <li>
              <Link to="/messages">Emails sent so far</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/form">
            <Form />
          </Route>
          <Route path="/messages">
            <Messages />
          </Route>
          <Route path="/">
            <h1>Welcome to my App! </h1>
            <p>
            The app enables you to fetch a random cat fact  from a public source and send it to a friend. You can also retrieve past facts sent
              </p>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
