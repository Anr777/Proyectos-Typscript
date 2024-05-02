import { OrderItem } from "../types";
import { formatCurrency } from '../helpers/index';
import { OrderActions } from "../reducers/order-reducer";

type OrderContentsProps = {
  order: OrderItem[];
  // deleteOrder: ( id: MenuItem[ 'id' ] ) => void;
  dispatch: React.Dispatch<OrderActions>
}

export function OrderContents( { order, dispatch }: OrderContentsProps ) {
  console.log( order );
  return (
    <div>
      <h2 className=" font-black text-4xl">Consumo</h2>
      <div className="space-y-3 mt-10">
        {


          order.map( ( { id, name, price, quantity } ) => (
            <div key={ id } className="flex justify-between border-t border-gray-200 py-5 last-of-type:border-b items-center">
              <div>
                <p className=" text-lg">{ name } - { formatCurrency( price ) } </p>
                <p className="font-black">Cantidad: { quantity } - { formatCurrency( price * quantity ) }</p>
              </div>
              <button onClick={ () => dispatch({ type: 'delete-item', payload: { id } }) } className="bg-red-600 text-white rounded-full h-6 w-6 font-black">X</button>
            </div>

          ) )

        }
      </div>
    </div>
  )
}

