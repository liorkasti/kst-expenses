// types.ts
export interface Expense {
    id: string;
    title: string;
    amount: number;
    date: Date;
  }
  
  export interface ExpenseState {
    expenses: Expense[];
  }
  
  export const ADD_EXPENSE = 'ADD_EXPENSE';
  export const DELETE_EXPENSE = 'DELETE_EXPENSE';
  
  interface AddExpenseAction {
    type: typeof ADD_EXPENSE;
    payload: Expense;
  }
  
  interface DeleteExpenseAction {
    type: typeof DELETE_EXPENSE;
    payload: string; // the ID of the expense to be deleted
  }
  
  export type ExpenseActionTypes = AddExpenseAction | DeleteExpenseAction;
  