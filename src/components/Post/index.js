// Core
import React, { Component } from 'react';
import { string, func, number, arrayOf, shape } from 'prop-types';
import moment from 'moment';

// Instruments
import Styles from './styles';

// Components
import Like from 'components/Like';

export default class Post extends Component {
    static propTypes = {
        author:     string.isRequired,
        avatar:     string.isRequired,
        comment:    string.isRequired,
        created:    number.isRequired,
        deletePost: func.isRequired,
        firstName:  string.isRequired,
        id:         string.isRequired,
        lastName:   string.isRequired,
        likePost:   func.isRequired,
        likes:      arrayOf(
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

        this.deletePost = ::this._deletePost;
        this.getCross = ::this._getCross;
    }

    shouldComponentUpdate (nextProps) {
        return JSON.stringify(nextProps) !== JSON.stringify(this.props);
    }

    _getCross () {
        const { userId, author: authorId } = this.props;

        return userId === authorId ? (
            <span className = { Styles.cross } onClick = { this.deletePost } />
        ) : null;
    }

    _deletePost () {
        const { deletePost, id } = this.props;

        deletePost(id);
    }

    render () {
        const {
            avatar,
            comment,
            created,
            firstName,
            id,
            lastName,
            likes,
            likePost,
            userId,
            userFirstName,
            userLastName
        } = this.props;

        const cross = this.getCross();

        return (
            <section className = { Styles.post }>
                {cross}
                <img src = { avatar } />
                <a>{`${firstName} ${lastName}`}</a>
                <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                <p>{comment}</p>
                <Like
                    id = { id }
                    likePost = { likePost }
                    likes = { likes }
                    userFirstName = { userFirstName }
                    userId = { userId }
                    userLastName = { userLastName }
                />
            </section>
        );
    }
}
