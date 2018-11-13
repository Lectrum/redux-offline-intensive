// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import cx from 'classnames';
import imageUrl from '../../theme/assets/images/1.jpeg';

// Components
import { Button } from './Button';

// Instruments
import Styles from './styles.m.css';

@hot(module)
export class Gallery extends Component {
    render() {
        const buttons = [...Array(4).keys()].map((_, currentImageIndex) => (
            <Button
                key={currentImageIndex}
                currentImageIndex={currentImageIndex}
                selectedImageIndex={0}
            />
        ));

        return (
            <section className={Styles.gallery}>
                <img src={imageUrl} />
                <div>
                    <button>←</button>
                    {buttons}
                    <button>→</button>
                </div>
            </section>
        );
    }
}
