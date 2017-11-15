// Core
import actions from './';

const postId = '123';
const userId = '456';
const post = {
    id:        postId,
    firstName: 'Jack'
};
const posts = [post];
const comment = 'hello';
const message = 'message';

describe('feed actions:', () => {
    test(`'fetchPosts' action creator should produce a corresponding action`, () => {
        expect(actions.fetchPosts()).toMatchSnapshot();
    });
    test(`'fetchPostsSuccess' action creator should produce a corresponding action`, () => {
        expect(actions.fetchPostsSuccess(posts)).toMatchSnapshot();
    });
    test(`'fetchPostsFail' action creator should produce a corresponding action`, () => {
        expect(actions.fetchPostsFail(message)).toMatchSnapshot();
    });
    test(`'createPost' action creator should produce a corresponding action`, () => {
        expect(actions.createPost(comment)).toMatchSnapshot();
    });
    test(`'createPostSuccess' action creator should produce a corresponding action`, () => {
        expect(actions.createPostSuccess(post)).toMatchSnapshot();
    });
    test(`'createPostFail' action creator should produce a corresponding action`, () => {
        expect(actions.createPostFail(message)).toMatchSnapshot();
    });
    test(`'deletePost' action creator should produce a corresponding action`, () => {
        expect(actions.deletePost(postId)).toMatchSnapshot();
    });
    test(`'deletePostSuccess' action creator should produce a corresponding action`, () => {
        expect(actions.deletePostSuccess(postId)).toMatchSnapshot();
    });
    test(`'deletePostFail' action creator should produce a corresponding action`, () => {
        expect(actions.deletePostFail(message)).toMatchSnapshot();
    });
    test(`'likePost' action creator should produce a corresponding action`, () => {
        expect(actions.likePost(postId)).toMatchSnapshot();
    });
    test(`'likePostSuccess' action creator should produce a corresponding action`, () => {
        expect(actions.likePostSuccess(postId, userId)).toMatchSnapshot();
    });
    test(`'likePostFail' action creator should produce a corresponding action`, () => {
        expect(actions.likePostFail(message)).toMatchSnapshot();
    });
});
