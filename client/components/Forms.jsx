import React from 'react';
import CreateReactClass from 'create-react-class';
import {CSSTransition} from 'react-transition-group';
import env from '../config/config'

const linkArray = [];

const hostName = env.client_api_prefix;

function randomStringFun(count) {
    if (count > 1 && typeof count === 'number') {
        let randomSum = '';
        const randomChar = function () {
            let randomItem = Math.floor(Math.random() * 62);
            if (randomItem < 10) return randomItem; //1-10
            if (randomItem < 36) return String.fromCharCode(randomItem + 55); //A-Z
            return String.fromCharCode(randomItem + 61); //a-z
        };

        while (randomSum.length < count) randomSum += randomChar();
        return randomSum;
    } else {
        console.error('Error: function randomStringFun() contains an invalid value, count = ' + count);
    }
}

const RandomlyForm = CreateReactClass({
    getInitialState() {
        return {
            URLShort: '',
            URLOrigin: '',
            URLShortCustom: '',
            alertBlankText: false,
            alertRepeatedText: false,
            animateFormRandomly: true,
            animateFormCustom: false,
            animateFormCopy: false,
            animateButtonShow: true,
            animateButtonHide: false,
            animateShortenButton: true
        };
    },

    handleRandomlyChange(event) {
        this.setState({URLOrigin: event.target.value});

        const shortUrl = hostName + '/' + randomStringFun(5);

        if (this.state.URLShortCustom.length === 0) {
            this.setState({
                alertBlankText: false,
                URLShort: shortUrl
            });
        }
    },

    handleCustomChange(event) {
        if (event.target.value.match("^[a-zA-Z0-9_]*$") !== null && event.target.value.length < 6) {
            this.setState({URLShortCustom: event.target.value});
        }

        const shortUrl = hostName + '/' + event.target.value.slice(0, 5);

        if (linkArray.indexOf(shortUrl) === -1) {
            this.setState({
                URLShort: shortUrl,
                alertRepeatedText: false
            });
        } else {
            this.setState({alertRepeatedText: true});
        }
    },

    handleLinkAdd() {
        if (this.state.URLOrigin.length > 0) {
            const newLink = {
                URLShort: this.state.URLShort,
                URLOrigin: this.state.URLOrigin,
            };

            this.props.onLinkAdd(newLink);

            this.setState({
                URLShort: this.state.URLShort,
                URLOrigin: '',
                animateFormCopy: true,
                animateFormRandomly: false,
                animateFormCustom: false,
                animateButtonShow: false,
                animateButtonHide: false
            });

        } else {
            this.setState({alertBlankText: true});
        }
    },

    copyUrl() {
        const copyText = document.getElementById('copy-url');
        copyText.select();
        document.execCommand("copy");
    },

    handleCustomForm() {
        this.setState({
            URLShortCustom: '',
            animateFormCustom: true,
            animateButtonShow: !this.state.animateButtonShow,
            animateButtonHide: !this.state.animateButtonHide,
            animateShortenButton: !this.state.animateShortenButton
        });
    },

    handleRandomlyForm() {
        const shortUrl = hostName + '/' + randomStringFun(5);

        this.setState({
            URLShortCustom: '',
            URLShort: shortUrl,
            animateFormRandomly: true,
            animateFormCustom: false,
            animateButtonShow: !this.state.animateButtonShow,
            animateButtonHide: !this.state.animateButtonHide,
            animateShortenButton: !this.state.animateShortenButton
        });
    },

    reloadPage() {
        window.location.reload();
    },

    render() {
        this.props.links.map(link => {
                linkArray.push(link.URLShort);
            }
        );

        return (
            <div className="form-wrapper">

                <CSSTransition
                    in={this.state.animateFormRandomly}
                    timeout={500}
                    classNames="form-block"
                >
                    <div id='randomly-form' className="form-block">
                        <h3>Randomly generate</h3>

                        <div className="input-group mb-3">
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter the link here'
                                value={this.state.URLOrigin}
                                onChange={this.handleRandomlyChange}/>

                            <CSSTransition
                                in={this.state.animateShortenButton}
                                timeout={500}
                                classNames="shorten-button"
                            >
                                <div className="input-group-append shorten-button">
                                    <button
                                        id='button-randomly'
                                        className='btn btn-outline-secondary'
                                        onClick={this.handleLinkAdd}>
                                        Shorten URL
                                    </button>
                                </div>
                            </CSSTransition>
                        </div>
                    </div>
                </CSSTransition>

                <CSSTransition
                    in={this.state.alertBlankText}
                    timeout={500}
                    classNames="alert"
                >
                    <div id="empty-field" className="alert alert-danger alert-exit-done" role="alert">
                        You forgot to enter url
                    </div>
                </CSSTransition>

                <CSSTransition
                    in={this.state.animateFormCustom}
                    timeout={500}
                    classNames="form-block"
                >
                    <div id='custom-form' className="form-block form-block-exit-done">
                        <h3>Custom url</h3>

                        <p className="mb-0">The maximum length is 5 characters.</p>

                        <div className="input-group mb-3">
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter the link here'
                                value={this.state.URLShortCustom}
                                onChange={this.handleCustomChange}/>
                            <div className="input-group-append">

                                <button
                                    id='button-randomly'
                                    className='btn btn-outline-secondary'
                                    onClick={this.handleLinkAdd}>
                                    Shorten URL
                                </button>
                            </div>
                        </div>

                        <CSSTransition
                            in={this.state.alertRepeatedText}
                            timeout={500}
                            classNames="alert"
                        >
                            <div id="already-taken" className="alert alert-danger alert-exit-done" role="alert">
                                Oops! This url is already taken = (
                            </div>
                        </CSSTransition>
                    </div>
                </CSSTransition>

                <CSSTransition
                    in={this.state.animateButtonShow}
                    timeout={500}
                    classNames="button"
                >
                    <div className="wrapper-button button">
                        <button
                            id="show-custom-form"
                            onClick={this.handleCustomForm}>
                            Custom url
                        </button>
                    </div>
                </CSSTransition>

                <CSSTransition
                    in={this.state.animateButtonHide}
                    timeout={500}
                    classNames="button"
                >
                    <div className="wrapper-button button button-exit-done">
                        <button
                            id="show-randomly-form"
                            onClick={this.handleRandomlyForm}>
                            Randomly generate
                        </button>
                    </div>
                </CSSTransition>

                <CSSTransition
                    in={this.state.animateFormCopy}
                    timeout={500}
                    classNames="form-block"
                >
                    <div id='copy-form' className="form-block form-block-exit-done">
                        <h3>Copy your URL</h3>

                        <div className="input-group mb-3">
                            <input
                                id="copy-url"
                                type='text'
                                className='form-control'
                                value={this.state.URLShort}
                                onChange={this.handleTextChange}
                                readOnly/>
                            <div className="input-group-append">

                                <button
                                    id='button-copy-url'
                                    className='btn btn-outline-secondary'
                                    onClick={this.copyUrl}>
                                    Copy URL
                                </button>
                            </div>
                        </div>

                        <div className="wrapper-button">
                            <button id="reload-page-button"
                                    onClick={this.reloadPage}>
                                Create new URL
                            </button>
                        </div>
                    </div>
                </CSSTransition>
            </div>
        );
    }
});

export default RandomlyForm;
