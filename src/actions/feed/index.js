// Types
import types from './types';

export default {
    fetchPosts: () => ({
        type: types.FETCH_POSTS
    }),
    fetchPostsSuccess: (posts) => ({
        type:    types.FETCH_POSTS_SUCCESS,
        payload: posts
    }),
    fetchPostsFail: (message) => ({
        type:    types.FETCH_POSTS_FAIL,
        payload: message
    }),
    createPost: (comment) => ({
        type:    types.CREATE_POST,
        payload: comment
    }),
    createPostSuccess: (post) => ({
        type:    types.CREATE_POST_SUCCESS,
        payload: post
    }),
    createPostFail: (message) => ({
        type:    types.CREATE_POST_FAIL,
        payload: message
    }),
    deletePost: (id) => ({
        type:    types.DELETE_POST,
        payload: id
    }),
    deletePostSuccess: (id) => ({
        type:    types.DELETE_POST_SUCCESS,
        payload: id
    }),
    deletePostFail: (message) => ({
        type:    types.DELETE_POST_FAIL,
        payload: message
    }),
    likePost: (postId) => ({
        type:    types.LIKE_POST,
        payload: postId
    }),
    likePostSuccess: (postId, userId) => ({
        type:    types.LIKE_POST_SUCCESS,
        payload: {
            postId,
            userId
        }
    }),
    likePostFail: (message) => ({
        type:    types.LIKE_POST_FAIL,
        payload: message
    })
};
