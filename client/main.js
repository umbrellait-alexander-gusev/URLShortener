import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import AppRouter from './components/Router.jsx';

ReactDOM.render(
        <AppRouter />,
    document.getElementById('content')
);