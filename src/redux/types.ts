import {TextInputProps} from 'react-native';

export interface UserStateType {
  username: string;
  id: string;
}
export interface ExpenseType {
  id: string;
  title: string;
  amount: number;
  date: string;
}

export interface ExpensesStateType {
  expenses: ExpenseType[];
  filters: FiltersType;
}
export interface ExpenseSectionType {
  title: string;
  data: ExpenseType[];
}

export interface FiltersType {
  title: string | '';
  date: string;
}

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export interface RootStateType {
  expenses: ExpensesStateType;
  user: UserStateType;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export type RootStackParamListType = {
  WelcomeScreen: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined;
  AppNavigation: undefined;
};

export interface InputType {
  label: string;
  textInputConfig?: TextInputProps;
  style?: {};
  testID?: string;
  invalid: boolean;
}
