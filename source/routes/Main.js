// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

// Pages
import { Feed } from '../pages';

@hot(module)
export default class Main extends Component {
    render() {
        return (
            <>
                <Feed />
            </>
        );
    }
}
