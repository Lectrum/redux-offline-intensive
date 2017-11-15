// Core
import { createSelector } from 'reselect';

const auth = (state) => state;

export const getAuthenticated = createSelector(auth, (state) =>
    state.get('authenticated')
);
