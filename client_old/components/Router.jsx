import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import App from "./App.jsx";
import OtherLinks from "./OtherLinks.jsx";

function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="" component={OtherLinks} />
                <OtherLinks/>
            </Switch>
        </Router>
    );
}

export default AppRouter;