import * as createActions from './createActions';
import { createReducer } from 'redux-act';
import { parseAPIError } from '../../utils/parseAPIError';

const initialState = {
  isLoading: false,
  error: undefined,
  slug: '',
};

export const createdReducer = createReducer(
  {
    [createActions.createActionsLoad]: (state) => {
      return { ...state, ...initialState, isLoading: true, slug: '' };
    },
    [createActions.createActionsSuccess]: (state, payload) => {
      return { ...state, isLoading: false, slug: payload };
    },
    [createActions.createActionsError]: (state, payload) => {
      return { ...state, isLoading: false, error: parseAPIError(payload), slug: '' };
    },
  },
  initialState,
);
