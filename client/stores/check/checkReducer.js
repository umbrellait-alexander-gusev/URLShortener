import { createReducer } from 'redux-act';

import * as checkActions from './checkActions';

const initialState = {
  isLoading: false,
  error: undefined,
};

export const checkReducer = createReducer(
  {
    [checkActions.checkActionsLoad]: (state) => {
      return { ...state, isLoading: true };
    },
    [checkActions.checkActionsSuccess]: (state) => {
      return { ...state, isLoading: false };
    },
    [checkActions.checkActionsError]: (state, payload) => {
      return { ...state, isLoading: false, error: payload };
    },
  },
  initialState,
);
