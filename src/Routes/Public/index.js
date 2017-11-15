// Core
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router';

// Instruments
import pages from 'Routes/pages';

// Components
import Login from 'containers/Login';
import Signup from 'containers/Signup';

export default class Public extends Component {
    render () {
        return (
            <Switch>
                <Route component = { Login } path = { pages.login } />
                <Route component = { Signup } path = { pages['sign-up'] } />
                <Redirect to = { pages.login } />
            </Switch>
        );
    }
}
