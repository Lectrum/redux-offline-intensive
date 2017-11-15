// Core
import { createSelector } from 'reselect';
import { Map } from 'immutable';

const postsIds = (state) => state.result;
const postsMap = (state) => state.entities.get('posts');
const authorsMap = (state) => state.entities.get('authors');

export const getPosts = createSelector(
    postsIds,
    postsMap,
    authorsMap,
    (ids, posts, authors) =>
        ids
            .map((id) =>
                posts
                    .get(id)
                    .merge(
                        authors
                            .get(posts.getIn([id, 'author']))
                            .delete('id')
                            .delete('created')
                    )
                    .update('likes', (likes) =>
                        likes.map((liker) =>
                            Map({
                                id:        liker,
                                firstName: authors.getIn([liker, 'firstName']),
                                lastName:  authors.getIn([liker, 'lastName'])
                            })
                        )
                    )
                    .delete('groupId')
            )
            .toJS()
);

export const getAuthors = createSelector(authorsMap, (authors) =>
    authors.map((author) => author).toJS()
);
