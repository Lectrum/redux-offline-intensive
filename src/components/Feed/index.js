// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles';
import { string } from 'prop-types';
import {
    Transition,
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';
import { fromTo } from 'gsap';

// Components
import Composer from '../../components/Composer';
import Post from '../../components/Post';
import Catcher from '../../components/Catcher';
import Counter from '../../components/Counter';
import Spinner from '../../components/Spinner';
import Postman from '../../components/Postman';

export default class Feed extends Component {
    static contextTypes = {
        api:   string.isRequired,
        token: string.isRequired
    };

    constructor () {
        super();

        this.createPost = ::this._createPost;
        this.deletePost = ::this._deletePost;
        this.getPosts = ::this._getPosts;
        this.startPostsFetching = ::this._startPostsFetching;
        this.stopPostsFetching = ::this._stopPostsFetching;
        this.likePost = ::this._likePost;
        this.handleComposerAppear = ::this._handleComposerAppear;
        this.handleCounterAppear = ::this._handleCounterAppear;
        this.handlePostmanAppear = ::this._handlePostmanAppear;
        this.handlePostmanDisappear = ::this._handlePostmanDisappear;
    }

    state = {
        posts:         [],
        postsFetching: false
    };

    componentDidMount () {
        this.getPosts();

        this.refetch = setInterval(this.getPosts, 3000);
    }

    componentWillUnmount () {
        clearInterval(this.refetch);
    }

    _startPostsFetching () {
        this.setState(() => ({
            postsFetching: true
        }));
    }

    _stopPostsFetching () {
        this.setState(() => ({
            postsFetching: false
        }));
    }

    async _createPost ({ comment }) {
        try {
            const { api, token } = this.context;

            this.startPostsFetching();

            const response = await fetch(api, {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:  token
                },
                body: JSON.stringify({
                    comment
                })
            });

            if (response.status !== 200) {
                this.stopPostsFetching();
                throw new Error('Post was not created!');
            }

            const { data } = await response.json();

            this.setState(({ posts }) => ({
                posts:         [data, ...posts],
                postsFetching: false
            }));
        } catch ({ message }) {
            console.log(message);
        }
    }

    async _getPosts () {
        try {
            const { api } = this.context;

            this.startPostsFetching();

            const response = await fetch(api, {
                method: 'GET'
            });

            if (response.status !== 200) {
                this.stopPostsFetching();
                throw new Error('Posts were not loaded.');
            }

            const { data: posts } = await response.json();

            this.setState(() => ({ posts, postsFetching: false }));
        } catch ({ message }) {
            console.log(message);
        }
    }

    async _deletePost (id) {
        try {
            const { api, token } = this.context;

            this.startPostsFetching();

            const response = await fetch(`${api}/${id}`, {
                method:  'DELETE',
                headers: {
                    Authorization: token
                }
            });

            if (response.status !== 204) {
                this.stopPostsFetching();
                throw new Error('Post was not deleted!');
            }

            this.setState(({ posts }) => ({
                posts:         posts.filter((post) => post.id !== id),
                postsFetching: false
            }));
        } catch ({ message }) {
            console.log(message);
        }
    }

    async _likePost (id) {
        try {
            const { api, token } = this.context;

            this.startPostsFetching();

            const response = await fetch(`${api}/${id}`, {
                method:  'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:  token
                }
            });

            if (response.status !== 200) {
                this.stopPostsFetching();
                throw new Error('Post was not liked!');
            }

            const { data } = await response.json();

            this.setState(({ posts }) => ({
                posts: posts.map((post) => post.id === data.id ? data : post)
            }));

            this.stopPostsFetching();
        } catch ({ message }) {
            console.log(message);
        }
    }

    _handleComposerAppear (composer) {
        fromTo(
            composer,
            1,
            {
                y:         -200,
                x:         500,
                opacity:   0,
                rotationY: 360
            },
            {
                y:         0,
                x:         0,
                opacity:   1,
                rotationY: 0
            }
        );
    }

    _handleCounterAppear (counter) {
        fromTo(
            counter,
            1,
            {
                x:         -1000,
                y:         -300,
                opacity:   0,
                rotationY: 360
            },
            {
                x:         0,
                y:         0,
                opacity:   1,
                rotationY: 0
            }
        );
    }

    _handlePostmanAppear (postman) {
        fromTo(
            postman,
            2,
            {
                x:       500,
                opacity: 0
            },
            {
                x:       0,
                opacity: 1
            }
        );
    }

    _handlePostmanDisappear (postman) {
        fromTo(
            postman,
            2,
            {
                x:       0,
                opacity: 1
            },
            {
                x:       500,
                opacity: 0
            }
        );
    }

    render () {
        const { posts: postsData, postsFetching } = this.state;
        const posts = postsData.map(
            ({ avatar, comment, created, firstName, id, lastName, likes }) => (
                <CSSTransition
                    classNames = { {
                        enter:       Styles.postInStart,
                        enterActive: Styles.postInEnd,
                        exit:        Styles.postOutStart,
                        exitActive:  Styles.postOutEnd
                    } }
                    key = { id }
                    timeout = { { enter: 700, exit: 600 } }>
                    <Catcher>
                        <Post
                            avatar = { avatar }
                            comment = { comment }
                            created = { created }
                            deletePost = { this.deletePost }
                            firstName = { firstName }
                            id = { id }
                            lastName = { lastName }
                            likePost = { this.likePost }
                            likes = { likes }
                        />
                    </Catcher>
                </CSSTransition>
            )
        );

        const spinner = postsFetching ? <Spinner /> : null;

        return (
            <section className = { Styles.feed }>
                {spinner}
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this.handleComposerAppear }>
                    <Composer createPost = { this.createPost } />
                </Transition>
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this.handleCounterAppear }>
                    <Counter count = { posts.length } />
                </Transition>
                <TransitionGroup>{posts}</TransitionGroup>
                <Transition
                    appear
                    in
                    timeout = { 3000 }
                    onEnter = { this.handlePostmanAppear }
                    onEntered = { this.handlePostmanDisappear }>
                    <Postman />
                </Transition>
            </section>
        );
    }
}
