// Core
import React, { Component } from 'react';

// Components
import {
    Catcher,
    Spinner,
    Header,
    ProfileForm,
    Notification,
} from '../components';

export class Profile extends Component {
    render() {
        return (
            <Catcher>
                <Spinner />
                <Header />
                <ProfileForm />
                <Notification />
            </Catcher>
        );
    }
}
