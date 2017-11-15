// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import { string, func } from 'prop-types';
import { getRandomColor } from '../../helpers';

export default class Composer extends Component {
    static contextTypes = {
        avatar:    string.isRequired,
        firstName: string.isRequired
    };

    static propTypes = {
        createPost: func.isRequired
    };

    constructor () {
        super();

        this.handleSubmit = ::this._handleSubmit;
        this.handleTextareaChange = ::this._handleTextareaChange;
        this.handleTextareaCopy = ::this._handleTextareaCopy;
        this.handleTextareaKeyPress = ::this._handleTextareaKeyPress;
        this.createPost = ::this._createPost;
    }

    state = {
        comment:           '',
        avatarBorderColor: '#90949C'
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

        this.props.createPost({ comment });

        this.setState(() => ({
            comment: ''
        }));
    }

    _handleTextareaChange (event) {
        const { value: comment } = event.target;

        this.setState(() => ({ comment }));
    }

    _handleTextareaCopy (event) {
        event.preventDefault();
    }

    _handleTextareaKeyPress (event) {
        const enterKey = event.key === 'Enter';

        enterKey
            ? this.createPost()
            : this.setState(() => ({
                avatarBorderColor: getRandomColor()
            }));

        if (enterKey) {
            event.preventDefault();
        }
    }

    render () {
        const { avatar, firstName } = this.context;
        const { comment, avatarBorderColor } = this.state;

        return (
            <section className = { Styles.composer }>
                <img src = { avatar } style = { { borderColor: avatarBorderColor } } />
                <form onSubmit = { this.handleSubmit }>
                    <textarea
                        placeholder = { `What's on your mind, ${firstName}?` }
                        value = { comment }
                        onChange = { this.handleTextareaChange }
                        onCopy = { this.handleTextareaCopy }
                        onKeyPress = { this.handleTextareaKeyPress }
                    />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}
