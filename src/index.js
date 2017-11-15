// Core
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';

// Instruments
import store, { history } from './store';
import './theme/reset.css';

// Routes
import Routes from './Routes';

render(
    <Provider store = { store }>
        <Router history = { history }>
            <Routes />
        </Router>
    </Provider>,
    document.getElementById('root')
);
