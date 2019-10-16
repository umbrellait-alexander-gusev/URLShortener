import { createReducer } from 'redux-act';

import * as createActions from './createActions';

const initialState = {
  isLoading: false,
  success: false,
  error: undefined,
  slug: '',
};

export const createdReducer = createReducer(
  {
    [createActions.createActionsLoad]: (state) => {
      return { ...state, ...initialState, isLoading: true, slug: '' };
    },
    [createActions.createActionsSuccess]: (state, payload) => {
      return { ...state, isLoading: false, success: true, slug: payload };
    },
    [createActions.createActionsError]: (state, payload) => {
      return { ...state, isLoading: false, success: false, error: payload, slug: '' };
    },
  },
  initialState,
);
