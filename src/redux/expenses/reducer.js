import {
  ExpenseState,
  ExpenseActionTypes,
  ADD_EXPENSE,
  DELETE_EXPENSE,
} from '../types';

const initialState: ExpenseState = {
  expenses: [],
};

const expensesReducer = (
  state = initialState,
  action: ExpenseActionTypes,
): ExpenseState => {
  switch (action.type) {
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case DELETE_EXPENSE:
      const updatedExpenses = state.expenses.filter(
        expense => expense.id !== action.payload,
      );
      return {
        ...state,
        expenses: updatedExpenses,
      };
    default:
      return state;
  }
};

export default expensesReducer;
