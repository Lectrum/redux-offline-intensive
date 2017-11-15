// Core
import { schema } from 'normalizr';

const author = new schema.Entity('authors');

export default new schema.Entity('posts', {
    author,
    likes: [author]
});
