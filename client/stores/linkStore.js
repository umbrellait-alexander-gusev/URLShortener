import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { checkReducer } from './check/checkReducer';
import { createdReducer } from './create/createReducer';
import createSagaMiddleware from 'redux-saga';
import { sagas } from '../sagas/sagas';

const initializeReduxDevTools = () => {
  if (
    process.env.NODE_ENV === 'production' ||
    typeof window === 'undefined' ||
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'undefined'
  ) {
    return compose;
  }

  return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
};

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = initializeReduxDevTools();
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

export const store = createStore(
  combineReducers({
    check: checkReducer,
    create: createdReducer,
  }),
  enhancer,
);

sagaMiddleware.run(sagas);
