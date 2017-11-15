// Core
import React, { Component } from 'react';
import { func, object } from 'prop-types';

// Instruments
import Styles from './styles.scss';

export default class Composer extends Component {
    static propTypes = {
        createPost: func.isRequired,
        profile:    object.isRequired
    };

    constructor () {
        super();

        this.handleSubmit = ::this._handleSubmit;
        this.handleTextareaChange = ::this._handleTextareaChange;
        this.handleTextareaKeyPress = ::this._handleTextareaKeyPress;
        this.createPost = ::this._createPost;
    }

    state = {
        comment: ''
    };

    _handleSubmit (event) {
        event.preventDefault();
        this._createPost();
    }

    _createPost () {
        const { comment } = this.state;

        if (!comment) {
            return;
        }

        this.props.createPost(comment);

        this.setState(() => ({
            comment: ''
        }));
    }

    _handleTextareaChange (event) {
        const { value: comment } = event.target;

        this.setState(() => ({ comment }));
    }

    _handleTextareaKeyPress (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.createPost();
        }
    }

    render () {
        const { profile: { avatar, firstName }} = this.props;
        const { comment } = this.state;

        return (
            <section className = { Styles.composer }>
                <img src = { avatar } />
                <form onSubmit = { this.handleSubmit }>
                    <textarea
                        placeholder = { `What's on your mind, ${firstName}?` }
                        value = { comment }
                        onChange = { this.handleTextareaChange }
                        onKeyPress = { this.handleTextareaKeyPress }
                    />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}
