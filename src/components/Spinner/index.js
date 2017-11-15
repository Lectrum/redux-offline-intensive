// Core
import React from 'react';
import { createPortal } from 'react-dom';

// Instruments
import Styles from './styles';

const portal = document.getElementById('spinner');

const Spinner = () =>
    createPortal(<section className = { Styles.spinner } />, portal);

export default Spinner;
