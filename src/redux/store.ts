import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userReducer';
import expensesReducer from './expensesReducer';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    user: userReducer,
    expenses: expensesReducer,
  },
  middleware: [thunk],
});

export default store;
