import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { browserHistory, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import rootReducer from './reducers/index';

const store = createStore(
  combineReducers({
    app: rootReducer,
    routing: routerReducer
  }),
  compose(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(browserHistory)),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )
);


const history = useRouterHistory(createHashHistory)({ queryKey: false });
export { store, history }
