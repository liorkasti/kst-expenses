import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Expense} from './types';

interface ExpensesState {
  expenses: Expense[];
}

const initialState: ExpensesState = {
  expenses: [],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
      // state.expenses.sort((a, b) => b.date.getTime() - a.date.getTime());
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter(
        expense => expense.id !== action.payload,
      );
    },
  },
});

export const {addExpense, deleteExpense} = expensesSlice.actions;

export default expensesSlice.reducer;
