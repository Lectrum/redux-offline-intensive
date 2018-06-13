// Core
import React, { Component } from 'react';

// Components
import { Catcher, Posts } from '../components';

export default class Feed extends Component {
    render () {
        return (
            <Catcher>
                <Posts />
            </Catcher>
        );
    }
}
