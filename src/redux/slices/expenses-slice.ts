import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ExpenseSectionType, RootStateType} from '../types';
import {ExpenseType, FiltersType} from '../types';
import {Alert} from 'react-native';
import moment from 'moment';

interface ExpensesState {
  expenses: ExpenseType[];
  filteredData: ExpenseType[];
  filters: FiltersType;
}

const d1 = moment(new Date(2023, 5, 17)).format('DD.MM.YYYY');
const d2 = moment(new Date(2023, 5, 18)).format('DD.MM.YYYY');
const d3 = moment(new Date(2023, 2, 3)).format('DD.MM.YYYY');
const d4 = moment(new Date(2023, 0, 1)).format('DD.MM.YYYY');

const initialState: ExpensesState = {
  expenses: [
    {amount: 33, date: d1, id: '1684244219970', title: 'T1'},
    {amount: 33, date: d1, id: '1684244219971', title: 'T1'},
    {amount: 33, date: d1, id: '1684244219972', title: 'T2'},
    {amount: 33, date: d1, id: '1684244219973', title: 'Test'},
    {amount: 33, date: d2, id: '1684244219974', title: 'Test'},
    {amount: 33, date: d3, id: '1684244219975', title: 'Test'},
    {amount: 33, date: d3, id: '1684244219976', title: 'Test'},
    {amount: 123, date: d4, id: '1684244779911', title: 'Qwe'},
    {amount: 123, date: d4, id: '1684244779912', title: 'Qwe'},
    {amount: 123, date: d4, id: '1684244779913', title: 'Qwe'},
  ],
  filteredData: [],
  filters: {
    title: '',
    date: null,
  },
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<ExpenseType>) => {
      const newExpense = action.payload;
      state.expenses.push(newExpense);
      state.expenses.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      const expenseId = action.payload;
      state.expenses = state.expenses.filter(
        expense => expense.id !== expenseId,
      );
    },
    setFilterTitle: (state, action: PayloadAction<string | ''>) => {
      state.filters.title = action.payload;
    },
    setFilterDate: (state, action: PayloadAction<Date | null>) => {
      state.filters.date = action.payload;
    },
    clearFilters: state => {
      state.filters.title = '';
      state.filters.date = null;
    },
    //TODO: use immer js and finish this..
    filterExpenses: state => {
      try {
        const {title, date} = state.filters;
        if (title && date) {
          console.log('date', date);
          state.filteredData = expenses.filter(
            expense =>
              expense?.date === date &&
              expense.title.toLowerCase().includes(title.toLowerCase()),
          );
        }
        if (title) {
          state.filteredData = expenses.filter((expense: ExpenseType) =>
            expense.title.toLowerCase().includes(title.toLowerCase()),
          );
        }

        if (date) {
          console.log('date', date);
          state.filteredData = expenses.filter(
            expense => expense?.date === date,
          );
        }
        console.log(filteredData);

        if (filteredData.length < 1) {
          Alert.alert('Sorry!', 'No results found.');
        } else {
          return filteredData;
        }
      } catch (error) {
        console.log('Filter Expenses Error', error);
      }
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
  filteredData,
  addExpense,
  deleteExpense,
  setFilterTitle,
  setFilterDate,
  clearFilters,
  filterExpenses,
} = expensesSlice.actions;

export default expensesSlice.reducer;
