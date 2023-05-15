import { ExpenseActionTypes, ADD_EXPENSE, DELETE_EXPENSE, Expense } from './types';

interface AddExpenseAction {
  type: typeof ADD_EXPENSE;
  payload: Expense;
}

interface DeleteExpenseAction {
  type: typeof DELETE_EXPENSE;
  payload: string;
}

export const addExpense = (expense: Expense): ExpenseActionTypes => {
  return {
    type: ADD_EXPENSE,
    payload: expense,
  };
};

export const deleteExpense = (id: string): ExpenseActionTypes => {
  return {
    type: DELETE_EXPENSE,
    payload: id,
  };
};

export type ExpenseAction = AddExpenseAction | DeleteExpenseAction;
