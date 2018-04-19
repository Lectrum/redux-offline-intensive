// Core
import React, { Component } from 'react';

// Components
import {
    Notifications,
    Spinner,
    Navigation,
    Catcher,
    NewPasswordForm
} from 'components';

export default class NewPassword extends Component {
    render () {
        return (
            <>
                <Notifications />
                <Spinner />
                <Navigation />
                <Catcher>
                    <NewPasswordForm />
                </Catcher>
            </>
        );
    }
}
