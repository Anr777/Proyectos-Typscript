import { useMemo } from "react";
import type { CartItem, GuitarId } from "../types";

type HeaderProps = {
  cart: CartItem[];
  onDeleteItem: ( id: GuitarId[ 'id' ] ) => void;
  decreaseQuantity: ( id: GuitarId[ 'id' ] ) => void;
  increaseQuantity: ( id: GuitarId[ 'id' ] ) => void;
  emptyCart: () => void;
}


export function Header( { cart,
  onDeleteItem, decreaseQuantity, increaseQuantity, emptyCart }: HeaderProps ) {

  const isEmpty = useMemo( () => cart.length === 0, [ cart ] );

  function additionPriceCart( cart : HeaderProps['cart'] ) {

    let total = 0;
    for ( let i = 0; i < cart.length; i++ ) {
      if ( cart.quantity === 1 ) {
        total += cart[ i ].price;

      } else {
        total += cart[ i ].price * cart[ i ].quantity;
      }
    }
    return total;

  }



  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

              <div id="carrito" className="bg-white p-3">
                { isEmpty
                  ? (
                    <p className="text-center">El carrito esta vacio</p>

                  ) : (
                    <>
                      <table className="w-100 table">
                        <thead>
                          <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            cart.map( ( guitar ) => (
                              <tr key={ guitar.id }>
                                <td>
                                  <img className="img-fluid" src={ `/img/${ guitar.image }.jpg` }
                                    alt={ guitar.image } />
                                </td>
                                <td>{ guitar.name }</td>
                                <td className="fw-bold">
                                  ${ guitar.price }
                                </td>
                                <td className="flex align-items-start gap-4">
                                  <button onClick={ () => decreaseQuantity( guitar.id ) } type="button" className="btn btn-dark">
                                    -
                                  </button>
                                  { guitar.quantity }
                                  <button onClick={ () => increaseQuantity( guitar.id ) } type="button" className="btn btn-dark">
                                    +
                                  </button>
                                </td>
                                <td>
                                  <button className="btn btn-danger" type="button"
                                    onClick={ () => onDeleteItem( guitar.id ) }
                                  >
                                    X
                                  </button>
                                </td>
                              </tr>
                            ) )
                          }
                        </tbody>
                      </table>



                      <p className="text-end">Total pagar: <span className="fw-bold">${
                        additionPriceCart( cart )
                      }</span></p>
                    </>

                  )
                }
                <button className="btn btn-dark w-100 mt-3 p-2" onClick={ emptyCart }>Vaciar Carrito</button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
