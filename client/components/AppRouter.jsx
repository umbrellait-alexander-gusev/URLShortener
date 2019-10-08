import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './App.jsx';
import { store } from '../stores/linkStore';
import { PageLinks } from '../components/PageLinks.jsx';

export class AppRouter extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="" component={PageLinks} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
