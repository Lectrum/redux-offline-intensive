// Core
import React, { Component } from 'react';

// Components
import { Catcher, SignupForm } from '../components';

export default class Signup extends Component {
    render () {
        return (
            <Catcher>
                <SignupForm />
            </Catcher>
        );
    }
}
