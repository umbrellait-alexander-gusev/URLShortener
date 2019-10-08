import { constants } from '../../constants/appConstants';

const checkActionsLoad = (newLink) => {
  return {
    type: constants.CHECK_LINK_REQUEST,
    payload: newLink,
  };
};

const checkActionsSuccess = (newLink) => {
  return {
    type: constants.CHECK_LINK_SUCCESS,
    payload: newLink,
  };
};

const checkActionsError = (newLink) => {
  return {
    type: constants.CHECK_LINK_ERROR,
    payload: newLink,
  };
};

export { checkActionsLoad, checkActionsSuccess, checkActionsError };
