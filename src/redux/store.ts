import {combineReducers, configureStore} from '@reduxjs/toolkit';
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

const rootReducer = combineReducers({
  user: userReducer,
  expenses: expensesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
