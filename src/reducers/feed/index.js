// Core
import { combineReducers } from 'redux';
import { Map, List, fromJS } from 'immutable';

// Instruments
import types from 'actions/feed/types';

const initialState = Map({
    authors: Map(),
    posts:   Map()
});

const result = (state = List(), { type, payload }) => {
    switch (type) {
        case types.FETCH_POSTS_SUCCESS:
            return List(payload.result);

        case types.CREATE_POST_SUCCESS:
            return state.unshift(fromJS(payload.result));

        case types.DELETE_POST_SUCCESS:
            return state.filter((id) => id !== payload);

        default:
            return state;
    }
};

const entities = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.FETCH_POSTS_SUCCESS:
            return fromJS(payload.entities);

        case types.CREATE_POST_SUCCESS:
            return state.mergeDeep(fromJS(payload.entities));

        case types.DELETE_POST_SUCCESS:
            return state.update('posts', (posts) => posts.delete(payload));

        case types.LIKE_POST_SUCCESS: {
            const { postId, userId } = payload;

            return state.update('posts', (posts) =>
                posts.update(postId, (post) =>
                    post.update(
                        'likes',
                        (likes) =>
                            likes.includes(userId)
                                ? likes.filter((liker) => liker !== userId)
                                : likes.unshift(userId)
                    )
                )
            );
        }

        default:
            return state;
    }
};

export default combineReducers({
    entities,
    result
});
