
import { v4 as uuidv4 } from 'uuid';
import { DraftExpense, Expense } from "../types";


export type BudgetActions =
  { type: 'add-budget', payload: { budget: number } } |
  { type: 'add-expense', payload: { expense: DraftExpense } } |
  { type: 'remove-expense', payload: { id: Expense[ 'id' ] } } |
  { type: 'get-expense-by-id', payload: { id: Expense[ 'id' ] } } |
  { type: 'update-expense', payload: { expense: Expense } }


export type BudgetState = {
  budget: number;
  expenses: Expense[];
  editingId: Expense[ 'id' ];
}

export const initialState: BudgetState = {
  budget: 0,
  expenses: [],
  editingId: '',
}

function createExpense( draftExpense: DraftExpense ): Expense {

  return {
    ...draftExpense,
    id: uuidv4(),
  }
}

export function BudgetReducer( state: BudgetState = initialState, action: BudgetActions ) {

  switch ( action.type ) {

    case 'add-budget':

      return {
        ...state,
        budget: action.payload.budget,
      }

    case 'add-expense': {

      const expense = createExpense( action.payload.expense );

      return {
        ...state,
        expenses: [ ...state.expenses, expense ],
      }
    }

    case 'remove-expense': {

      return {
        ...state,
        expenses: state.expenses.filter( expense => expense.id !== action.payload.id ),
      }
    }

    case 'get-expense-by-id': {

      return {
        ...state,
        editingId: action.payload.id,
      }
    }

    case 'update-expense': {

      return {
        ...state,
        expenses: state.expenses.map( expense => expense.id === action.payload.expense.id ?
          action.payload.expense : expense ),
          editingId: '',
      }
    }

    default:
      return state;

  }

}