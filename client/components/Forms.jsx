import React from 'react';
import $ from 'jquery';

const linkArray = [];

function randomStringFun(count) {
    let randomSum = '';
    const randomChar = function () {
        let randomItem = Math.floor(Math.random() * 62);
        if (randomItem < 10) return randomItem; //1-10
        if (randomItem < 36) return String.fromCharCode(randomItem + 55); //A-Z
        return String.fromCharCode(randomItem + 61); //a-z
    };

    while (randomSum.length < count) randomSum += randomChar();
    return randomSum;
}

const RandomlyForm = React.createClass({
    getInitialState() {
        return {
            URLShort: '',
            URLOrigin: '',
            URLShortCustom: '',
        };
    },

    handleRandomlyChange(event) {
        this.setState({URLOrigin: event.target.value});

        const hostName = document.domain;
        // const hostName = 'http://localhost:3001';
        const shortUrl = hostName + '/' + randomStringFun(5);

        if (this.state.URLShortCustom.length === 0) this.setState({URLShort: shortUrl});
    },

    handleCustomChange(event) {
        if(event.target.value.match("^[a-zA-Z0-9_]*$") !== null && event.target.value.length < 6){
            this.setState({URLShortCustom: event.target.value});
        }

        const hostName = document.domain;
        // const hostName = 'http://localhost:3001';
        const shortUrl = hostName + '/' + event.target.value.slice(0, 5);

        if (linkArray.indexOf(shortUrl) === -1) {
            this.setState({URLShort: shortUrl});
            $('#already-taken').slideUp('linear');

        } else {
            $('#already-taken').slideDown('linear');
        }
    },

    handleLinkAdd() {
        if (this.state.URLOrigin.length > 0) {
            const newLink = {
                URLShort: this.state.URLShort,
                URLOrigin: this.state.URLOrigin,
            };

            this.props.onLinkAdd(newLink);
            this.setState({URLShort: this.state.URLShort, URLOrigin: ''});
            $('#custom-form').slideUp('linear');
            $('#randomly-form').slideUp('linear');
            $('#show-custom-form').slideUp('linear');
            $('#show-randomly-form').slideUp('linear');
            $('#copy-form').slideDown('linear');
            $('#empty-field').slideUp('linear');

        } else {
            $('#empty-field').slideDown('linear');
        }
    },

    copyUrl() {
        const copyText = document.getElementById('copy-url');
        copyText.select();
        document.execCommand("copy");
    },

    handleCustomForm() {
        $('#custom-form').slideDown('linear');
        $('#button-randomly').hide('linear');
        $('#show-custom-form').slideUp('linear');
        $('#show-randomly-form').slideDown('linear');

        this.setState({URLShortCustom: ''});
    },

    handleRandomlyForm() {
        $('#custom-form').slideUp('linear');
        $('#button-randomly').show('linear');
        $('#show-custom-form').slideDown('linear');
        $('#show-randomly-form').slideUp('linear');

        this.setState({URLShortCustom: ''});
    },

    reloadPage() {
        window.location.reload();
    },

    render() {
        this.props.links.map(link => {
                linkArray.push(link.URLShort);

                let secondDateItem = Date.parse(link.createdAt) / 1000;
                let secondDateNow = Date.parse(new Date()) / 1000;
                let sec = secondDateNow - secondDateItem;
                let min = sec / 60;
                let hour = min / 60;
                let day = hour / 24;
                let dayNow = day.toFixed(0);

                if (dayNow > 1) this.props.onLinkDelete(link);
            }
        );

        return (
            <div className="form-wrapper">

                <div id='randomly-form'>
                    <h3>Randomly generate</h3>

                    <div className="input-group mb-3">
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Enter the link here'
                            value={this.state.URLOrigin}
                            onChange={this.handleRandomlyChange}/>
                        <div className="input-group-append">

                            <button
                                id='button-randomly'
                                className='btn btn-outline-secondary'
                                onClick={this.handleLinkAdd}>
                                Shorten URL
                            </button>
                        </div>
                    </div>
                </div>

                <div id="empty-field" className="alert alert-danger" role="alert">
                    You forgot to enter url
                </div>

                <div id='custom-form'>
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

                    <div id="already-taken" className="alert alert-danger" role="alert">
                        Oops! This url is already taken = (
                    </div>
                </div>

                <div className="wrapper-button">
                    <button
                        id="show-custom-form"
                        onClick={this.handleCustomForm}>
                        Custom url
                    </button>
                </div>

                <div className="wrapper-button">
                    <button
                        id="show-randomly-form"
                        onClick={this.handleRandomlyForm}>
                        Randomly generate
                    </button>
                </div>

                <div id='copy-form'>
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
            </div>
        );
    }
});

export default RandomlyForm;
