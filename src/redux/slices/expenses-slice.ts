import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ExpenseType, ExpensesStateType} from '../types';
import {Alert} from 'react-native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const d1 = moment(new Date(2023, 5, 17)).format('DD.MM.YYYY');
const d2 = moment(new Date(2023, 5, 18)).format('DD.MM.YYYY');
const d3 = moment(new Date(2023, 2, 3)).format('DD.MM.YYYY');
const d4 = moment(new Date(2023, 0, 1)).format('DD.MM.YYYY');

const initialState: ExpensesStateType = {
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
    date: '',
  },
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<ExpenseType>) => {
      const newExpense = action.payload;
      state.expenses = [...state.expenses, newExpense];
      state.expenses.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      const expenseId = action.payload;
      state.expenses = state.expenses.filter(
        expense => expense.id !== expenseId,
      );
      state.filteredData = state.filteredData.filter(
        expense => expense.id !== expenseId,
      );
    },
    setFilterTitle: (state, action: PayloadAction<string | ''>) => {
      state.filters.title = action.payload;
    },
    setFilterDate: (state, action: PayloadAction<string | ''>) => {
      state.filters.date = action.payload;
    },
    clearFilters: state => {
      state.filters.title = '';
      state.filters.date = '';
    },
    clearFilterData: state => {
      state.filteredData = [];
    },
    filterExpenses: state => {
      try {
        const {title, date} = state.filters;
        const {expenses} = state;
        let filteredData = [...expenses]; // TODO: use immer js

        if (title && date) {
          filteredData = filteredData.filter(
            expense =>
              expense?.date === date &&
              expense.title.toLowerCase().includes(title.toLowerCase()),
          );
        } else if (title) {
          filteredData = filteredData.filter(expense =>
            expense.title.toLowerCase().includes(title.toLowerCase()),
          );
        } else if (date) {
          filteredData = filteredData.filter(expense => expense?.date === date);
        }

        state.filteredData = filteredData;

        if (filteredData.length < 1) {
          Alert.alert('Sorry!', 'No results found.');
        }
      } catch (error) {
        console.log('Filter Expenses Error', error);
      }
    },
  },
});

export const {
  addExpense,
  deleteExpense,
  setFilterTitle,
  setFilterDate,
  clearFilters,
  filterExpenses,
  clearFilterData,
} = expensesSlice.actions;

export const updateLocalStorage = async (expenses: ExpenseType[]) => {
  try {
    await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
    // console.log(await AsyncStorage.getItem('expenses'));
  } catch (error) {
    console.log('Error updating local storage:', error);
  }
};

export default expensesSlice.reducer;
