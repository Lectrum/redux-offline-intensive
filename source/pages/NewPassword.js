// Core
import React, { Component } from 'react';

// Components
import {
    Catcher,
    Spinner,
    Header,
    NewPasswordForm,
    Notification,
} from '../components';

export class NewPassword extends Component {
    render() {
        return (
            <Catcher>
                <Spinner />
                <Header />
                <NewPasswordForm />
                <Notification />
            </Catcher>
        );
    }
}
