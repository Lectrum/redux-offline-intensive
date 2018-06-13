// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import photo1 from '../../../theme/assets/photos/1';

// Instruments
import Styles from './styles.m.css';

@hot(module)
export default class Gallery extends Component {
    static defaultProps = {
        // State
        currentPhoto: 0,

        // Actions
        changePhoto: () => {},
        photos:      [
            {
                url: photo1,
            }
        ],
    };

    _showNextPhoto = () => {
        const { currentPhoto } = this.props;

        this.props.changePhoto(currentPhoto + 1);
    };

    _showPrevPhoto = () => {
        const { currentPhoto } = this.props;

        this.props.changePhoto(currentPhoto - 1);
    };

    render () {
        const { currentPhoto, photos } = this.props;

        const url = photos[currentPhoto].url;

        return (
            <section className = { Styles.gallery }>
                <img src = { url } />
                <div>
                    <button onClick = { this._showPrevPhoto }>←</button>
                    <button onClick = { this._showNextPhoto }>→</button>
                </div>
            </section>
        );
    }
}
