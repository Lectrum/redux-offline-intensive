// Core
import React from 'react';
import { object } from 'prop-types';

// Instruments
import Styles from './styles';

const Postman = ({ profile: { avatar, firstName }}) => (
    <section className = { Styles.postman }>
        <img src = { avatar } />
        <span>Welcome online, {firstName}!</span>
    </section>
);

Postman.propTypes = {
    profile: object.isRequired
};

export default Postman;
