export interface UserState {
  username: string;
  id: string;
}
export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
}

export interface ExpenseState {
  expenses: Expense[];
  filters: Filters;
}
export interface ExpenseSection {
  title: string;
  data: Expense[];
}

export interface Filters {
  title: string | '';
  date: Date | null;
}

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

interface AddExpenseAction {
  type: typeof ADD_EXPENSE;
  payload: Expense;
}

export interface RootState {
  expenses: ExpenseState;
  filters: Filters;
  user: UserState;
}

interface DeleteExpenseAction {
  type: typeof DELETE_EXPENSE;
  payload: string; // the ID of the expense to be deleted
}

export type ExpenseActionTypes = AddExpenseAction | DeleteExpenseAction;

export type RootStackParamList = {
  WelcomeScreen: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined;
  AppNavigation: undefined;
};
