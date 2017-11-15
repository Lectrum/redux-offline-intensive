// Core
import React from 'react';

// Instruments
import Styles from './styles';
import PropTypes from 'prop-types';

const Postman = (props, { avatar, firstName }) => (
    <section className = { Styles.postman }>
        <img src = { avatar } />
        <span>Welcome online, {firstName}!</span>
    </section>
);

Postman.contextTypes = {
    avatar:    PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired
};

export default Postman;
