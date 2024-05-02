import { OrderActions } from "../reducers/order-reducer";
import { MenuItem } from "../types";

type MenuItemsProps = {
  item: MenuItem;
  dispatch: React.Dispatch<OrderActions>;
  // dispatch: React.DispatchWithoutAction<OrderActions>;
}

export function MenuItems( { item, dispatch }: MenuItemsProps ) {


  return (
    <button onClick={ () => dispatch( { type: 'add-item', payload: { item } } ) }
      className=" border-2 border-teal-400 hover:bg-teal-200 w-full flex justify-between"
    >
      <p>{ item.name }</p>
      <p className=" font-black">${ item.price }</p>
    </button>
  )
}

