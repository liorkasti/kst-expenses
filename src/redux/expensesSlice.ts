import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store';
import {Expense} from './types';

interface ExpensesState {
  expenses: Expense[];
  filters: {
    title: string;
    date: Date | null;
  };
}

const initialState: ExpensesState = {
  expenses: [
    {amount: 33, date: '03/03/2023', id: '1684244219976', title: 'Test'},
    {amount: 33, date: '03/03/2023', id: '1684244219976', title: 'Test'},
    {amount: 33, date: '03/03/2023', id: '1684244219976', title: 'Test'},
    {amount: 123, date: '1-1-2023', id: '1684244779913', title: 'Qwe'},
    {amount: 123, date: '1-1-2023', id: '1684244779913', title: 'Qwe'},
    {amount: 123, date: '1-1-2023', id: '1684244779913', title: 'Qwe'},
  ],
  filters: {
    title: '',
    date: null,
  },
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense>) => {
      const newExpense = action.payload;
      state.expenses.push(newExpense);
      state.expenses.sort((a, b) => b.date.getTime() - a.date.getTime());
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      const expenseId = action.payload;
      state.expenses = state.expenses.filter(
        expense => expense.id !== expenseId,
      );
    },
    setFilterTitle: (state, action: PayloadAction<string>) => {
      state.filters.title = action.payload;
    },
    setFilterDate: (state, action: PayloadAction<Date | null>) => {
      state.filters.date = action.payload;
    },
    clearFilters: state => {
      state.filters.title = '';
      state.filters.date = null;
    },
  },
});

export const selectFilteredExpenses = (state: RootState) => {
  const {title, date} = state.expenses.filters;
  return state.expenses.expenses.filter(expense => {
    let isTitleMatch = true;
    let isDateMatch = true;

    if (title) {
      isTitleMatch = expense.title.toLowerCase().includes(title.toLowerCase());
    }

    if (date) {
      isDateMatch =
        expense.date.getFullYear() === date.getFullYear() &&
        expense.date.getMonth() === date.getMonth() &&
        expense.date.getDate() === date.getDate();
    }

    return isTitleMatch && isDateMatch;
  });
};

export const {
  addExpense,
  deleteExpense,
  setFilterTitle,
  setFilterDate,
  clearFilters,
} = expensesSlice.actions;

export default expensesSlice.reducer;
