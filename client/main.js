import React from 'react';
import ReactDOM from 'react-dom';

// import dotenv from 'dotenv';
// import path from 'path';
//
// dotenv.config({
//     path: path.resolve('../.env')
// });
//
// console.log(process.env.REACT_APP_DB_NAME);

const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
    path: path.resolve("./.env")
});

console.log(`TEST => ${process.env.REACT_APP_DB_NAME}`);

import AppRouter from './components/Router.jsx';

ReactDOM.render(
        <AppRouter />,
    document.getElementById('content')
);