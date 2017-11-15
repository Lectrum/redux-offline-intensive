// Core
import { createSelector } from 'reselect';

const profile = (state) => state;

export const getProfile = createSelector(profile, (state) => state.toJS());
