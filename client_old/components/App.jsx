import React from 'react';
import CreateReactClass from 'create-react-class';
import Header from '../layout/Header.js';
import Footer from '../layout/Footer.js';
import TextInfo from '../layout/TextInfo.js';

import LinksStore from '../stores/LinksStore';
import LinksActions from '../actions/LinksActions';

import Forms from './Forms.jsx';

import 'bootstrap/scss/bootstrap.scss';
import '../style/sass/main.scss';

function getStateFromFlux() {
    return {
        isLoading: LinksStore.isLoading(),
        links: LinksStore.getLinks()
    };
}

const App = CreateReactClass({
    getInitialState() {
        return getStateFromFlux();
    },

    handleLinkAdd(linkData) {
        LinksActions.createLink(linkData);
    },

    render() {
        return (
            <div id="wrapper-content">
                <Header/>

                <main className="bg-light d-flex flex-column justify-content-center align-items-center">
                    <div className="wrapper w-100 p-4 my-5 bg-white">
                        <h1 className="text-center mb-5">
                            <span className="welcome-text">Paste the URL to be shortened</span>
                            <span className="ready-text">Your shortened URL ready</span>
                        </h1>

                        <Forms onLinkAdd={this.handleLinkAdd} links={this.state.links} />

                        <p className="mt-3">Use our URL Shortener to create a shortened link making it easy to remember.</p>
                    </div>

                    <TextInfo/>
                </main>

                <Footer/>
            </div>
        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    }
});

export default App;
