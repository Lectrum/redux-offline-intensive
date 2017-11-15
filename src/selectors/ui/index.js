// Core
import { createSelector } from 'reselect';

const ui = (state) => state;

export const getInitialized = createSelector(ui, (state) =>
    state.get('initialized')
);

export const getAuthFetching = createSelector(ui, (state) =>
    state.get('authFetching')
);

export const getFeedFetching = createSelector(ui, (state) =>
    state.get('feedFetching')
);

export const getProfileFetching = createSelector(ui, (state) =>
    state.get('profileFetching')
);

export const getProfileEditing = createSelector(ui, (state) =>
    state.get('profileEditing')
);

export const getPasswordEditing = createSelector(ui, (state) =>
    state.get('passwordEditing')
);

export const getAvatarFetching = createSelector(ui, (state) =>
    state.get('avatarFetching')
);
