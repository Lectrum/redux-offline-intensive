// Core
import React, { Component } from 'react';

// Components
import { Catcher, NewPasswordForm } from '../components';

export default class NewPassword extends Component {
    render () {
        return (
            <Catcher>
                <NewPasswordForm />
            </Catcher>
        );
    }
}
