import { constants } from '../../constants/appConstants';
import { env } from '../../config/config';
const apiPrefix = env.api_prefix;

const initialState = {
  isLoading: false,
  error: undefined,
  duplicate: false,
};

export const checkReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.CHECK_LINK_REQUEST:
      return { ...state, ...initialState, isLoading: true };
    case constants.CHECK_LINK_SUCCESS: {
      let links = [];
      const arr = action.payload.data.data;
      const value = [];
      value.push(action.payload.value);

      arr.map((link) => {
        let linkCode = link.shortUrl;
        let relinkCode = linkCode.replace(apiPrefix + '/', '');
        links.push(relinkCode);
      });

      if (value.some((item) => links.includes(item))) {
        return { ...state, isLoading: false, duplicate: true };
      } else {
        return { ...state, isLoading: false, duplicate: false };
      }
    }
    case constants.CHECK_LINK_ERROR:
      return { ...state, error: action.payload, isLoading: false };
  }
  return state;
};
