import React from 'react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';

import 'bootstrap/scss/bootstrap.scss';
import '../style/sass/main.scss';
import { Collapse } from 'react-collapse';

export class Page404 extends React.Component {
  render() {
    return (
      <div id="wrapper-content">
        <Header />

        <main className="bg-light d-flex flex-column justify-content-center align-items-center">
          <div className="form-block">
            <div className="container">
              <div className="row">
                <div className="error-template d-flex flex-column align-items-center">
                  <h1>Oops!</h1>
                  <h2>404 Not Found</h2>
                  <div className="error-details">Sorry, an error has occured, Requested page not found!</div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}
