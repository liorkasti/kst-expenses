import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import expensesReducer from './slices/expenses-slice';
import userReducer from './slices/user-slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    expenses: expensesReducer,
  },
  middleware: [thunk],
});

export default store;
