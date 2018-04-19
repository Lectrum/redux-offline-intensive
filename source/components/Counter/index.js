// Core
import React from 'react';

// Instruments
import Styles from './styles.m.css';

const Counter = ({ count }) => (
    <section className = { Styles.counter }>Posts count: {count}</section>
);

Counter.defaultProps = {
    count: 0,
};

export default Counter;
