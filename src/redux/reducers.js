import {
  STORE_USER,
  SAVE_DATA,
  FETCH_DATA,
  LOGIN,
  LOGOUT,
  SET_LOADING,
} from './types';

const initialState = {
  username: '',
  expenses: [],
  loading: false,
};

const reducers = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case STORE_USER:
      return {...state, username: payload};
    case SAVE_DATA:
      return {...state, payload};
    case FETCH_DATA:
      return {
        ...state,
        expenses: payload,
      };
    case LOGIN:
      return {
        ...state,
        user: payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        expenses: [],
      };
    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};

export default reducers;
