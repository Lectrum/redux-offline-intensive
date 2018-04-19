// Core
import React, { Component } from 'react';

// Components
import {
    Notifications,
    Spinner,
    Navigation,
    Catcher,
    LoginForm
} from 'components';

export default class Login extends Component {
    render () {
        return (
            <>
                <Notifications />
                <Spinner />
                <Navigation />
                <Catcher>
                    <LoginForm />
                </Catcher>
            </>
        );
    }
}
