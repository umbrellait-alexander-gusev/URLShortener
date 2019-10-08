import { constants } from '../../constants/appConstants';

const createActionsLoad = (newLink) => {
  return {
    type: constants.CREATE_LINK_REQUEST,
    payload: newLink,
  };
};

const createActionSuccess = (newLink) => {
  return {
    type: constants.CREATE_LINK_SUCCESS,
    payload: newLink,
  };
};

const createActionsError = (newLink) => {
  return {
    type: constants.CREATE_LINK_ERROR,
    payload: newLink,
  };
};

export { createActionsLoad, createActionSuccess, createActionsError };
