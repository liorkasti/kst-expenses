import {combineReducers, createStore} from 'redux';
import {Expense} from './types';
import expensesReducer from './expenses/reducer';

export interface RootState {
  expenses: Expense[];
}

const rootReducer = combineReducers({
  expenses: expensesReducer,
});

const store = createStore(rootReducer);

export default store;
