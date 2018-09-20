// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';

export class Spinner extends Component {
    static defaultProps = {
        isFetching: false,
    };

    render() {
        const { isFetching } = this.props;

        return isFetching ? <div className = { Styles.spinner } /> : null;
    }
}
