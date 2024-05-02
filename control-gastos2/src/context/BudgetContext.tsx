
import { useReducer, createContext, useMemo } from 'react';
import { BudgetActions, BudgetReducer, BudgetState, initialState } from '../reducers/budget-reducer';

type BudgetContextProps = {
  state: BudgetState,
  dispatch: React.Dispatch<BudgetActions>,
  totalExpenses: number;
  remainingBudget: number;
}

type BudgetProviderProps = {
  children: React.ReactNode,
}

export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps);

export function BudgetProvider({ children } : BudgetProviderProps ) {

  const [ state, dispatch ] = useReducer(BudgetReducer, initialState);
  

  const totalExpenses = useMemo( () => {
    return state.expenses.reduce((total, expense) => expense.amount + total, 0);
  }, [ state.expenses ]);

  const remainingBudget = state.budget - totalExpenses;


  return (
    <BudgetContext.Provider value={{
      state,
      dispatch,
      totalExpenses,
      remainingBudget,
    }}>
      { children }
    </BudgetContext.Provider>
  )

}



