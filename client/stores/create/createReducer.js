import { constants } from '../../constants/appConstants';

const initialState = {
  isLoading: false,
  error: undefined,
  shortUrl: '',
};

export const createReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.CREATE_LINK_REQUEST:
      return { ...state, ...initialState, isLoading: true, shortUrl: '' };
    case constants.CREATE_LINK_SUCCESS: {
      let shortUrl = '';
      const shortUrlId = action.payload.data.data._id;
      action.payload.db.data.map((item) => {
        if (item._id === shortUrlId) {
          shortUrl = item.shortUrl;
        }
      });

      return { ...state, isLoading: false, shortUrl: shortUrl };
    }
    case constants.CREATE_LINK_ERROR:
      return { ...state, error: action.payload, isLoading: false, shortUrl: '' };
  }
  return state;
};
