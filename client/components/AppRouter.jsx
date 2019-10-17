import React from 'react';
import '@babel/polyfill';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../stores/linkStore';
import { App } from './App.jsx';
import { Page404 } from './Page404.jsx';
import { PageLinks } from '../components/PageLinks.jsx';

export class AppRouter extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/page-not-found" component={Page404} />
            <Route path="" component={PageLinks} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
