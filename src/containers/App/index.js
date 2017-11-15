// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles';
import moment from 'moment';

export default class App extends Component {

    timer = setInterval(() => this.forceUpdate(), 1000);

    render () {
        return (
            <section className = { Styles.app }>
                <h1>Welcome!</h1>
                <p>It is {moment().format('MMMM D h:mm:ss a')}.</p>
            </section>
        );
    }
}
