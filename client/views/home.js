import React from 'react';
import $ from 'jquery'
import Header from '../layout/Header.js';
import Footer from '../layout/Footer.js';
import TextInfo from '../layout/TextInfo.js';
import FormSubmit from './components/FormSubmit.js';
import FormCustomSubmit from './components/FormCustomSubmit.js';
import FormCopy from './components/FormCopy.js';

const formRandomly = [{
    form: [{
        classID: "randomly-form",
        action: "",
        titleH3: "Randomly generate",
        text: "",
        onSubmit: "true"
    }],
    input: [{
        name: "urlName",
        type: "url",
        className: "form-control",
        placeholder: "Enter the link here",
        ariaLabel: "Enter the link here",
        ariaDescribedby: "button-randomly",
    }],
    button: [{
        className: "btn btn-outline-secondary",
        type: "submit",
        classID: "button-randomly",
        text: "Shorten URL"
    }]
}];

const formCustomUrl = [{
    form: [{
        classID: "custom-form",
        action: "",
        titleH3: "Custom url",
        text: "Enter your text that will follow the domain. No more than five characters. The address of five will be cut off.",
        onSubmit: "true"
    }],
    input: [{
        name: "urlName",
        type: "text",
        className: "form-control",
        placeholder: "Enter the link here",
        ariaLabel: "Enter the link here",
        ariaDescribedby: "Custom url"
    }],
    button: [{
        className: "btn btn-outline-secondary",
        type: "submit",
        classID: "Custom url",
        text: "Shorten URL"
    }]
}];

const formCopy = [{
    form: [{
        classID: "copy-form",
        action: "",
        titleH3: "Copy your URL",
        text: "",
        onSubmit: ""
    }],
    input: [{
        name: "urlName",
        type: "text",
        className: "form-control",
        placeholder: "",
        ariaLabel: "",
        ariaDescribedby: "button-copy-url"
    }],
    button: [{
        className: "btn btn-outline-secondary",
        type: "button",
        classID: "button-copy-url",
        text: "Copy URL"
    }]
}];

export default class Home extends React.Component {
    reloadPage() {
        window.location.reload();
    }

    showCustomForm() {
        $('#show-randomly-form').slideDown('linear');
        $('#show-custom-form').slideUp('linear');
        $('#randomly-form').slideUp('linear');
        $('#custom-form').slideDown('linear');
    }

    showRandomlyForm() {
        $('#show-randomly-form').slideUp('linear');
        $('#show-custom-form').slideDown('linear');
        $('#randomly-form').slideDown('linear');
        $('#custom-form').slideUp('linear');
    }

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

                        <FormSubmit formObj={formRandomly}/>

                        <FormCustomSubmit formObj={formCustomUrl}/>

                        <div className="wrapper-button mb-1">
                            <button id="show-custom-form" onClick={this.showCustomForm}  className="text-primary navbar-text">Custom url</button>
                        </div>

                        <div className="wrapper-button mb-1">
                            <button id="show-randomly-form" onClick={this.showRandomlyForm}  className="text-primary navbar-text">Randomly url</button>
                        </div>

                        <div className="alert alert-danger" role="alert">
                            Oops! This url is already taken = (
                        </div>

                        <div id="empty-field" className="alert alert-danger" role="alert">
                            You forgot to enter url
                        </div>

                        <FormCopy formObj={formCopy}/>

                        <div className="wrapper-button mb-1">
                            <button id="reload-page-button" onClick={this.reloadPage} className="text-primary navbar-text">Create new URL</button>
                        </div>

                        <p>Use our URL Shortener to create a shortened link making it easy to remember.</p>
                    </div>

                    <TextInfo/>
                </main>

                <Footer/>
            </div>
        );
    }
}