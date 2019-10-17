import React from 'react';

import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { TextInfo } from '../layout/TextInfo';
import { ToastContainer } from 'react-toastify';
import { Form } from './form';

import 'react-toastify/scss/main.scss';
import 'bootstrap/scss/bootstrap.scss';
import '../style/sass/main.scss';

export class App extends React.Component {
  render() {
    return (
      <div id="wrapper-content">
        <ToastContainer autoClose={10000} />
        <Header />

        <main className="bg-light d-flex flex-column justify-content-center align-items-center">
          <div className="wrapper w-100 p-4 my-5 bg-white">
            <h1 className="text-center mb-5">
              <span className="welcome-text">Paste the URL to be shortened</span>
              <span className="ready-text">Your shortened URL ready</span>
            </h1>

            <Form />

            <p className="mt-3">Use our URL Shortener to create a shortened link making it easy to remember.</p>
          </div>

          <TextInfo />
        </main>

        <Footer />
      </div>
    );
  }
}
