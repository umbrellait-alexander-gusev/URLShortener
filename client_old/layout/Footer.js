import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="navbar navbar-light bg-dark d-flex justify-content-center">
                <div className="wrapper-footer w-100 text-center">
                    <span className="navbar-text text-white font-weight-bold mr-2">{String.fromCharCode(169)} 2019 Copyright:</span>

                    <a className="text-primary navbar-text font-weight-bold" href="https://vk.com/gusev_alexandr_vladimirovich/">AlexanderWeb</a>
                </div>
            </footer>
        );
    }
}