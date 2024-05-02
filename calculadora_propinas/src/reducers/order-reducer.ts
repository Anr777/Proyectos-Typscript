import { MenuItem, OrderItem } from "../types";


export type OrderActions =
  { type: 'add-item', payload: { item: MenuItem } } |
  { type: 'delete-item', payload: { id: MenuItem[ 'id' ] } } |
  { type: 'place-order' } |
  { type: 'add-tip', payload: { value: number } }


export type OrderState = {
  order: OrderItem[],
  tip: number;
}

export const initialState: OrderState = {
  order: [],
  tip: 0,
}

export function orderReducer( state: OrderState = initialState, action: OrderActions ) {

  switch ( action.type ) {

    case 'add-item':

      const itemExist = state.order.find( orderItem => orderItem.id === action.payload.item.id )
      
      
      let updateOrder : OrderItem[] = []
      if ( itemExist ) {

        //? FORMA DEL DOCENTE
        updateOrder = state.order.map( orderItem => orderItem.id === action.payload.item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem );
      } else {
        const newItem : OrderItem = { ...action.payload.item, quantity: 1 };
        updateOrder = [ ...state.order, newItem ]
      }

      return {
        ...state,
        order: updateOrder,
      }

    case 'delete-item':

  

      return {
        ...state,
        order: state.order.filter( orderItem => orderItem.id !== action.payload.id )
      }

    case 'place-order':

      return {
        ...state,
        order: [],
        tip: 0,
      }

    case 'add-tip':

      return {
        ...state,
        tip: action.payload.value,
      }

    default:
      return state;

  }

}