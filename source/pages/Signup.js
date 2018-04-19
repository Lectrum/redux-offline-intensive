// Core
import React, { Component } from 'react';

// Components
import {
    Notifications,
    Spinner,
    Navigation,
    Catcher,
    SignupForm
} from 'components';

export default class Signup extends Component {
    render () {
        return (
            <>
                <Notifications />
                <Spinner />
                <Navigation />
                <Catcher>
                    <SignupForm />
                </Catcher>
            </>
        );
    }
}
