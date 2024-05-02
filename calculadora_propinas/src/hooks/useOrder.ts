import { useState } from "react"
import { MenuItem, OrderItem,  } from "../types";


export default function useOrder() {

  const [ order, setOrder ] = useState<OrderItem[]>([]);
  const [ tip, setTip ] = useState<number>(0);

  function addItem( item : MenuItem ) {
    console.log('agregando...', item);
    
    const itemExist  = order.find( orderItem => orderItem.id === item.id )    
    //? MI FORMA DE HACERLO
    //const itemIndex = order.findIndex( orderItem => orderItem.id === item.id );
    console.log(itemExist)
    if ( itemExist ) {
      //? MI FORMA DE HACERLO
      //const updateItem = [...order]
      //updateItem[itemIndex].quantity++;
      //setOrder( updateItem );

      //? FORMA DEL DOCENTE
      const updateOrder = order.map( orderItem => orderItem.id === item.id ? {...orderItem, quantity: orderItem.quantity + 1 } : orderItem );
      setOrder(updateOrder);
    } else {
      const newItem = {...item, quantity: 1 };
      setOrder( prev => [...prev, newItem ]);
    }
  
  }

  function deleteOrder( id : MenuItem['id']  ) {
    console.log('desde delete', id);
    const orderUpdate = order.filter( orderItem => orderItem.id !== id );
    setOrder( orderUpdate );
  }

  function placeOrder() {

    console.log('guardando...')
    setTip(0);
    setOrder([]);
  }

  return {
    addItem,
    tip,
    setTip,
    order,
    deleteOrder,
    placeOrder
  }
}