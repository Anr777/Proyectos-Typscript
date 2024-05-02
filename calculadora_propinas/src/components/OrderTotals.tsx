import { useMemo } from "react";
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers";
import { OrderActions } from "../reducers/order-reducer";

type OrderTotalsProps = {
  order: OrderItem[];
  tip: number;
  // placeOrder: () => void;
  dispatch: React.Dispatch<OrderActions>
}

export function OrderTotals( { order, tip, dispatch }: OrderTotalsProps ) {


  const subTotalAmount = useMemo( () => order.reduce( ( total, item ) => total + ( item.quantity * item.price ), 0 ), [ order ] );

  const tipAmount = useMemo( () => subTotalAmount * tip, [ tip, order ] );
  const totalAmount = useMemo( () => ( tipAmount + subTotalAmount ), [ tip, order ]);


  console.log( order )
  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl">Totales y Propinas:</h2>

        <p>Subtotal a pagar:
          <span className="font-black">{ formatCurrency( subTotalAmount ) }</span>
        </p>

        <p>Propina:
          <span className="font-black">{ formatCurrency( tipAmount )}</span>
        </p>

        <p>Total a Pagar:
          <span className="font-black">{ formatCurrency( totalAmount ) }</span>

        </p>
      </div>
      <button className="w-full bg-black uppercase p-3 text-white mt-10 font-black  disabled:opacity-10"
        disabled={ totalAmount === 0 && tipAmount === 0 }
        onClick={ () => dispatch({ type: 'place-order' }) }
      >Guardar Orden</button>
    </>
  )
}

