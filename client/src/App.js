import React from "react";
import Login from "./Login";
import MainScreen from "./MainScreen";
import AuthState from "./context/Auth/AuthState";
import HymnalState from "./context/Hymnal/HymnalState";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <AuthState>
      <HymnalState>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/mainScreen" component={MainScreen} />
          </Switch>
        </Router>
      </HymnalState>
    </AuthState>
  );
}
