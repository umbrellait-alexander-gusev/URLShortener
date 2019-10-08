import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-light bg-secondary">
                    <div className="wrapper w-100 d-flex justify-content-center">
                        <a className="navbar-brand m-0" href="/">
                            <h2 className="navbar-text font-weight-bold p-0 m-0">URL Shortener</h2>
                        </a>
                    </div>
                </nav>
            </header>
        );
    }
}