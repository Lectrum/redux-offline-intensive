// Core
import React, { Component } from 'react';

// Components
import {
    Notifications,
    Spinner,
    Navigation,
    Catcher,
    ProfileForm
} from 'components';

export default class Profile extends Component {
    render () {
        return (
            <>
                <Notifications />
                <Spinner />
                <Navigation />
                <Catcher>
                    <ProfileForm />
                </Catcher>
            </>
        );
    }
}
