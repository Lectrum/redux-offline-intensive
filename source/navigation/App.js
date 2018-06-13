// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

// Components
import { Nav } from '../components';

// Pages
import { Feed } from '../pages';

@hot(module)
export default class App extends Component {
    static defaultProps = {
        // State
        isAuthenticated: false,
        isInitialized:   false,

        // Actions:
        initializeAsync:  () => {},
        listenConnection: () => {},
        listenPosts:      () => {},
    };

    componentDidMount () {
        const { initializeAsync, listenConnection } = this.props;

        listenConnection();
        initializeAsync();
    }

    render () {
        return (
            <>
                <Nav />
                <Feed />
            </>
        );
    }
}
