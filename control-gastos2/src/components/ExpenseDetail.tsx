import { useMemo } from "react";
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list';
import { AmountDisplay } from ".";
import { formatDate } from "../helpers";
import { Expense } from "../types"
import { categories } from "../data/categories";
import 'react-swipeable-list/dist/styles.css';
import { useBudget } from "../hooks/useBudget";
// import { useBudget } from "../hooks/useBudget";

type ExpenseDetailProps = {
  expense: Expense;
}

export function ExpenseDetail( { expense }: ExpenseDetailProps ) {

  const categoryInfo = useMemo( () => categories.filter( cat => cat.id === expense.category )[ 0 ], [ expense ] );

  const { dispatch } = useBudget();




  function leadingActions() {
    return (
      <LeadingActions>
        <SwipeAction onClick={ () => {
          dispatch( { type: "get-expense-by-id", payload: { id: expense.id } } )
        } } >
          Actualizar
        </SwipeAction>
      </LeadingActions>
    )
  }

  function trailingActions() {
    return (
      <TrailingActions>
        <SwipeAction onClick={ () => {
          dispatch( { type: 'remove-expense', payload: { id: expense.id } } )
        } }
          destructive={ true }
        >
          Eliminar
        </SwipeAction>
      </TrailingActions>
    )
  }



  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={ 1 }
        leadingActions={ leadingActions() }
        trailingActions={ trailingActions() }
      >

        <div className="bg-white shadow-lg p-6 w-full border-b border-gray-200 flex gap-5 items-center">
          <div>
            <img src={ `/icono_${ categoryInfo.icon }.svg` } alt="Gasto" className="w-20" />
          </div>

          <div className="flex-1 space-y-2">
            <p className=" text-sm font-bold uppercase text-slate-500">
              { categoryInfo.name }
            </p>
            <p>{ expense.expenseName }</p>
            <p className=" text-slate-600 text-sm">{ formatDate( expense.date!.toString() ) }</p>
          </div>

          <AmountDisplay amount={ expense.amount } />
        </div>

      </SwipeableListItem>
    </SwipeableList>
  )
}

