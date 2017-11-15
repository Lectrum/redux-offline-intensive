// Core
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

// Instruments
import reducer from 'reducers';
import { saga } from 'sagas';

const dev = process.env.NODE_ENV === 'development'; // eslint-disable-line
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const middleware = [];
const composeEnhancers = dev && devtools ? devtools : compose;

const logger = createLogger({
    duration:  true,
    collapsed: true,
    diff:      true,
    colors:    {
        title:     () => '#139BFE',
        prevState: () => '#1C5FAF',
        action:    () => '#149945',
        nextState: () => '#A47104',
        error:     () => '#ff0005'
    }
});
const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

if (dev) {
    middleware.push(logger);
    middleware.push(thunk);
}

middleware.push(sagaMiddleware);
middleware.push(routerMiddleware(history));

export { history };
export default createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(saga);
