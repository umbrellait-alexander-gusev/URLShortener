import React from 'react';

import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';

import 'bootstrap/scss/bootstrap.scss';
import '../style/sass/main.scss';

export class Page404 extends React.Component {
  render() {
    return (
      <div id="wrapper-content">
        <Header />

        <main className="bg-light d-flex flex-column justify-content-center align-items-center">
          <div className="form-block page-not-found-text">
            <div className="container">
              <div className="row">
                <div className="error-template d-flex flex-column align-items-center">
                  <h1>Oops!</h1>
                  <h2>404 Not Found</h2>
                  <div className="error-details pb-5">Sorry, an error has occured, Requested page not found!</div>
                  <a href="/" className="btn btn-secondary btn-lg active" role="button" aria-pressed="true">
                    Main page
                  </a>
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
