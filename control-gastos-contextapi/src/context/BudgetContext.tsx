
import { ReactNode, createContext, useReducer } from "react";
import { BudgetActions, BudgetReducer, BudgetState, initialState } from "../reducers/budget-reducer";

type BudgetContextProps = {
  state: BudgetState,
  dispatch: React.Dispatch<BudgetActions>;
}

type BudgetProviderProps = {
  children: ReactNode;
}

export const BudgetContext = createContext<BudgetContextProps>(null!);

export function BudgetProvider( { children } : BudgetProviderProps ) {

  const [ state, dispatch ] = useReducer( BudgetReducer, initialState );

  return (
    <BudgetContext.Provider value={{
      state,
      dispatch
    }}>
      { children }
    </BudgetContext.Provider>
  )
}