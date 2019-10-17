import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import * as checkActions from '../stores/check/checkActions';
import * as createActions from '../stores/create/createActions';
import { checkSlug, createLink } from '../api';
import { parseAPIError } from '../utils/parseAPIError';
import { env } from '../config/config';

const apiPrefix = env.api_prefix;

function* checkSaga(action) {
  try {
    const data = yield call(checkSlug, action.payload);
    if (data.data) {
      toast.warn('Oops! This url is already taken = (');
    }
    yield put(checkActions.checkActionsSuccess(data));
  } catch (error) {
    yield put(checkActions.checkActionsError(error));
  }
}

function* createSaga(action) {
  try {
    const data = yield call(createLink, action.payload);
    yield put(createActions.createActionsSuccess(`${apiPrefix}/${data.data.slug}`));
  } catch (error) {
    yield put(createActions.createActionsError(parseAPIError(error)));
  }
}

export function* sagas() {
  yield takeLatest(checkActions.checkActionsLoad, checkSaga);
  yield takeLatest(createActions.createActionsLoad, createSaga);
}
