// Core
import React, { Component } from 'react';
import { fromJS } from 'immutable';

// Components
import { Spinner, Catcher, Posts } from 'components';

export default class Feed extends Component {
    static defaultProps = {
        isFeedFetching: false,
        profile:        fromJS({
            id:     '123',
            avatar:
                'http://i0.kym-cdn.com/entries/icons/original/000/000/774/lime-cat.jpg',
            firstName: 'Cat',
        }),
        actions: {
            fetchPosts: () => {},
            fetchUsers: () => {},
            createPost: () => {},
        },
        posts: [],
    };

    render () {
        const { actions, isFeedFetching, profile, posts } = this.props;

        return (
            <>
                <Spinner spin = { isFeedFetching } />
                <Catcher>
                    <Posts actions = { actions } posts = { posts } profile = { profile } />
                </Catcher>
            </>
        );
    }
}
