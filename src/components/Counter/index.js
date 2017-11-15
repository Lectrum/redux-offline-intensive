// Core
import React from 'react';
import { number } from 'prop-types';

// Instruments
import Styles from './styles.scss';

const Counter = ({ count }) => (
    <section className = { Styles.counter }>Posts count: {count}</section>
);

Counter.propTypes = {
    count: number.isRequired
};

Counter.defaultProps = {
    count: 0
};

export default Counter;
