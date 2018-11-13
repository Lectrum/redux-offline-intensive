// Core
import React, { Component } from 'react';

// Components
import { Catcher, Spinner, Header, Posts, Notification } from '../components';

export class Feed extends Component {
    render() {
        return (
            <Catcher>
                <Spinner />
                <Header />
                <Posts />
                <Notification />
            </Catcher>
        );
    }
}
