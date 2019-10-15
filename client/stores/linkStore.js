import { createStore, combineReducers } from 'redux';
import { checkReducer } from './check/checkReducer';
import { createdReducer } from './create/createReducer';

const rootReducer = combineReducers({
  check: checkReducer,
  create: createdReducer,
});

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export { store };
