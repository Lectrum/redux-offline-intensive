// Core
import React, { Component } from 'react';
import { string, func, arrayOf, shape } from 'prop-types';

// Instruments
import Styles from './styles.scss';

export default class Like extends Component {
    static propTypes = {
        id:       string.isRequired,
        likePost: func.isRequired,
        likes:    arrayOf(
            shape({
                firstName: string.isRequired,
                lastName:  string.isRequired
            }).isRequired
        ).isRequired,
        userFirstName: string.isRequired,
        userId:        string.isRequired,
        userLastName:  string.isRequired
    };

    constructor () {
        super();

        this.likePost = ::this._likePost;
        this.showLikers = ::this._showLikers;
        this.hideLikers = ::this._hideLikers;
        this.getLikedByMe = ::this._getLikedByMe;
        this.getLikersList = ::this._getLikersList;
        this.getTotalLikes = ::this._getTotalLikes;
    }

    state = {
        showLikers: false
    };

    _likePost () {
        const { likePost, id } = this.props;

        likePost(id);
    }

    _showLikers () {
        this.setState(() => ({
            showLikers: true
        }));
    }

    _hideLikers () {
        this.setState(() => ({
            showLikers: false
        }));
    }

    _getLikedByMe () {
        const { userId, likes } = this.props;

        return likes.some(({ id }) => id === userId);
    }

    _getLikersList () {
        const { likes } = this.props;
        const { showLikers } = this.state;

        return likes.length && showLikers ? (
            <ul>
                {likes.map(({ firstName, lastName, id }) => (
                    <li key = { id }>{`${firstName} ${lastName}`}</li>
                ))}
            </ul>
        ) : null;
    }

    _getTotalLikes () {
        const { likes, userFirstName, userLastName } = this.props;

        const likedByMe = this.getLikedByMe();

        return likes.length === 1 && likedByMe
            ? `${userFirstName} ${userLastName}`
            : likes.length === 2 && likedByMe
                ? `You and ${likes.length - 1} other`
                : likedByMe ? `You and ${likes.length - 1} others` : likes.length;
    }

    render () {
        const likedByMe = this.getLikedByMe();

        const likeStyles = likedByMe
            ? `${Styles.icon} ${Styles.liked}`
            : `${Styles.icon}`;

        const likersList = this.getLikersList();
        const totalLikes = this.getTotalLikes();

        return (
            <section className = { Styles.like }>
                <span className = { likeStyles } onClick = { this.likePost }>
                    Like
                </span>
                <div>
                    {likersList}
                    <span
                        onMouseEnter = { this.showLikers }
                        onMouseLeave = { this.hideLikers }>
                        {totalLikes}
                    </span>
                </div>
            </section>
        );
    }
}
