// Core
import React, { Component } from 'react';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';

export class Button extends Component {
    render() {
        const { selectedImageIndex, currentImageIndex } = this.props;

        const buttonActiveStyle = cx({
            [ Styles.buttonActive ]: selectedImageIndex === currentImageIndex,
        });

        return (
            <button className = { buttonActiveStyle }>
                {currentImageIndex + 1}
            </button>
        );
    }
}
