import { useEffect, useState } from "react";
import { db } from "../data/db";
import type { CartItem, Guitar, GuitarId } from '../types';


export function useCart() {
  
  const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : []
  };
  const [ data ] = useState(db);
  const [ cart, setCart ] = useState(initialCart);
  


  useEffect( () => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart( item : Guitar ) {
   
    const itemExists = cart.findIndex( guitar => (
      guitar.id === item.id
    ) );
    const MAX_ITEMS = 5;

    if ( itemExists >= 0 ) {
      const updateCart = [ ...cart ];
      if ( updateCart[ itemExists ].quantity + 1 <= MAX_ITEMS){
        updateCart[ itemExists ].quantity++;
        setCart( updateCart );
      }
    } else {
      const newItem : CartItem = { ...item, quantity: 1 }
      setCart( prev => [ ...prev, newItem ] );
    }

  }

  function increaseQuantity( id : GuitarId ) {
    const itemsExists = cart.findIndex( guitar => guitar.id === +id );
    const MAX_ITEMS = 5;
    if ( itemsExists >= 0 ) {
      const updateCart = [ ...cart ];
      if (updateCart[ itemsExists].quantity + 1 <= MAX_ITEMS) {
        updateCart[ itemsExists ].quantity++;
        setCart( updateCart );

      }
    }

  }


  function decreaseQuantity( id : GuitarId ) {

    const itemExists = cart.findIndex( guitar => (
      guitar.id === +id
    ) );

    if ( itemExists >= 0 ) {

      const updateCart = [ ...cart ];
      if ( updateCart[ itemExists ].quantity === 1 ) return;
      updateCart[ itemExists ].quantity--;
      setCart( updateCart );
    }

  }

  function deleteItem( id : GuitarId ) {
    console.log( 'click delete', id )
    setCart( prev => prev.filter( guitar => guitar.id !== +id ) );

  }

  function emptyCart() {
    setCart([]);
  }

  return {
    emptyCart,
    deleteItem,
    decreaseQuantity,
    increaseQuantity,
    addToCart,
    initialCart,
    data,
    db,
    cart,
  }

}
