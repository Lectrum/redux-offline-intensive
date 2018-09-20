// Core
import React, { Component } from 'react';

// Components
import { Catcher, Spinner, Header, LoginForm, Notification } from '../components';

export class Login extends Component {
    render() {
        return (
            <Catcher>
                <Spinner />
                <Header />
                <LoginForm />
                <Notification />
            </Catcher>
        );
    }
}
