// Core
import React, { Component } from 'react';

// Components
import { Catcher, Spinner, Header, SignupForm, Notification } from '../components';

export class Signup extends Component {
    render() {
        return (
            <Catcher>
                <Spinner />
                <Header />
                <SignupForm />
                <Notification />
            </Catcher>
        );
    }
}
