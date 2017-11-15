// Core
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

// Instruments
import ui from './ui';
import forms from './forms';
import auth from './auth';
import profile from './profile';
import feed from './feed';

export default combineReducers({
    router,
    ui,
    forms,
    auth,
    profile,
    feed
});
