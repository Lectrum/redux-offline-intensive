// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles';
import moment from 'moment';
import { string, func, number, arrayOf, shape } from 'prop-types';

// Components
import Like from '../../components/Like';

export default class Post extends Component {
    static contextTypes = {
        firstName: string.isRequired,
        lastName:  string.isRequired
    };

    static propTypes = {
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
        ).isRequired
    };

    constructor () {
        super();

        this.deletePost = ::this._deletePost;
    }

    shouldComponentUpdate (nextProps) {
        return JSON.stringify(nextProps) !== JSON.stringify(this.props);
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
            likePost
        } = this.props;

        const { firstName: ownFirstName, lastName: ownLastName } = this.context;

        const isAbleToDelete =
            `${firstName} ${lastName}` === `${ownFirstName} ${ownLastName}` ? (
                <span className = { Styles.cross } onClick = { this.deletePost } />
            ) : null;

        return (
            <section className = { Styles.post }>
                {isAbleToDelete}
                <img src = { avatar } />
                <a>{`${firstName} ${lastName}`}</a>
                <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                <p>{comment}</p>
                <Like id = { id } likePost = { likePost } likes = { likes } />
            </section>
        );
    }
}
