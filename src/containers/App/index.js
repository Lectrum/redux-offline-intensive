// Core
import React, { Component } from 'react';

// Instruments
import { string } from 'prop-types';
import avatar from '../../theme/assets/homer.png';

// Components
import Feed from '../../components/Feed';
import Catcher from '../../components/Catcher';

const GROUP_ID = '';
const TOKEN = '';

const options = {
    api:       `https://lab.lectrum.io/react/api/${GROUP_ID}`,
    avatar,
    firstName: 'Homer',
    lastName:  'Simpson',
    token:     TOKEN
};

export default class App extends Component {
    static childContextTypes = {
        api:       string.isRequired,
        avatar:    string.isRequired,
        firstName: string.isRequired,
        lastName:  string.isRequired,
        token:     string.isRequired
    };

    getChildContext () {
        return options;
    }

    render () {
        return (
            <Catcher>
                <Feed />
            </Catcher>
        );
    }
}
