// import {ref} from '../constants/firebase.utils';
import {STORE_USER, FETCH_DATA, LOGIN, LOGOUT, SET_LOADING} from './types';

export const storeUser = name => {
  return {
    type: STORE_USER,
    payload: name,
  };
};

export const logout = async callback => dispatch => {
  // ref.doc(null);
  callback ? callback() : null;
  dispatch({
    type: LOGOUT,
  });
};

export const login = async (payload, callback) => dispatch => {
  try {
    // ref.doc(payload).set({ foo: 'bar' }, { merge: true })
    callback ? callback() : null;
    dispatch({
      type: LOGIN,
      payload,
    });
  } catch (error) {
    console.log(
      'login: Something went wrong while fetching from firestore.',
      error,
    );
  }
};

export const setLoading = (payload, callback) => dispatch => {
  callback ? callback() : null;
  dispatch({
    type: SET_LOADING,
    payload,
  });
};

export const fetchFavorites = async user => {
  try {
    // let favorites = await ref.doc(user).get();
    return (dispatch, getState) => {
      if (getState().reducers.loading) {
        dispatch({
          type: FETCH_DATA,
          payload: favorites
            .data()
            .favorites?.sort((a, b) => a.published_at > b.published_at),
        });
      } else {
        dispatch({
          type: FETCH_DATA,
          payload: [],
        });
      }
      console.log(getState());
    };
  } catch (error) {
    console.log('Something went wrong while fetching from firestore.', error);
  }
};
