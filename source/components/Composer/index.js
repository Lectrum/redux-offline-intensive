// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';

export default class Composer extends Component {
    state = {
        comment: '',
    };

    _submitComment = (event) => {
        event.preventDefault();
        this._createPost();
    };

    _createPost = () => {
        const { comment } = this.state;

        if (!comment) {
            return;
        }

        this.props.actions.createPostAsync(comment);

        this.setState({
            comment: '',
        });
    };

    _handleTextareaChange = (event) => {
        const { value: comment } = event.target;

        this.setState({
            comment,
        });
    };

    _handleTextareaKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this._createPost();
        }
    };

    render () {
        const { comment } = this.state;
        const { profile } = this.props;

        return (
            <section className = { Styles.composer }>
                <img src = { profile.get('avatar') } />
                <form onSubmit = { this._submitComment }>
                    <textarea
                        placeholder = { `What's on your mind, ${profile.get(
                            'firstName',
                        )}?` }
                        value = { comment }
                        onChange = { this._handleTextareaChange }
                        onKeyPress = { this._handleTextareaKeyPress }
                    />
                    <input type = 'submit' value = 'Запостить' />
                </form>
            </section>
        );
    }
}
