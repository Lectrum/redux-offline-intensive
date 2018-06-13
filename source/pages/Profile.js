// Core
import React, { Component } from 'react';

// Components
import { Catcher, ProfileForm } from '../components';

export default class Profile extends Component {
    render () {
        return (
            <Catcher>
                <ProfileForm />
            </Catcher>
        );
    }
}
