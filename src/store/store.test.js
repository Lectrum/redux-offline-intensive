// Core
import { combineReducers, createStore } from 'redux';
import { routerReducer as router } from 'react-router-redux';

// Instruments
import store from './';
import ui from 'reducers/ui';
import forms from 'reducers/forms';
import auth from 'reducers/auth';
import profile from 'reducers/profile';
import feed from 'reducers/feed';

const reducer = combineReducers({
    router,
    ui,
    forms,
    auth,
    profile,
    feed
});

const expectedStore = createStore(reducer);

describe('store:', () => {
    test('should have a valid state shape', () => {
        expect(store.getState()).toEqual(expectedStore.getState());
    });
});
