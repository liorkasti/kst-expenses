import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/user-slice';
import expensesReducer from './slices/expenses-slice';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    user: userReducer,
    expenses: expensesReducer,
  },
  middleware: [thunk],
});

export default store;
