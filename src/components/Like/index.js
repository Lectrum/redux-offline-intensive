// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import { string, func, arrayOf, shape } from 'prop-types';

export default class Like extends Component {
    static contextTypes = {
        firstName: string.isRequired,
        lastName:  string.isRequired
    };

    static propTypes = {
        id:       string.isRequired,
        likePost: func.isRequired,
        likes:    arrayOf(
            shape({
                firstName: string.isRequired,
                lastName:  string.isRequired
            }).isRequired
        ).isRequired
    };

    static defaultProps = {
        likes: []
    };

    constructor () {
        super();

        this.showLikers = ::this._showLikers;
        this.hideLikers = ::this._hideLikers;
        this.likePost = ::this._likePost;
        this.getLikedPosts = ::this._getLikedPosts;
        this.getLikersList = ::this._getLikersList;
        this.getTotalLikes = ::this._getTotalLikes;
    }

    state = {
        showLikers: false
    };

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

    _likePost () {
        const { likePost, id } = this.props;
        const { firstName, lastName } = this.context;

        likePost(id, firstName, lastName);
    }

    _getLikedPosts () {
        const { firstName: ownFirstName, lastName: ownLastName } = this.context;

        return this.props.likes.some(
            ({ firstName, lastName }) =>
                `${firstName} ${lastName}` === `${ownFirstName} ${ownLastName}`
        );
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
        const { likes } = this.props;
        const { firstName: ownFirstName, lastName: ownLastName } = this.context;

        const likedByMe = likes.some(
            ({ firstName, lastName }) =>
                `${firstName} ${lastName}` === `${ownFirstName} ${ownLastName}`
        );

        return likes.length === 1 && likedByMe
            ? `${ownFirstName} ${ownLastName}`
            : likes.length === 2 && likedByMe
                ? `You and ${likes.length - 1} other`
                : likedByMe ? `You and ${likes.length - 1} others` : likes.length;
    }

    render () {
        const likedPosts = this.getLikedPosts();
        const likeStyles = likedPosts
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
