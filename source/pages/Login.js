// Core
import React, { Component } from 'react';

// Components
import { Catcher, LoginForm } from '../components';

export default class Login extends Component {
    render () {
        return (
            <Catcher>
                <LoginForm />
            </Catcher>
        );
    }
}
