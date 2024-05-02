import { useReducer } from "react";
import { MenuItems, OrderContents, OrderTotals, TipPercentageForm } from "./components";
import { menuItems } from "./data/db";
import { initialState, orderReducer } from "./reducers/order-reducer";

function App() {

  console.log( menuItems );
  // const { addItem, order, deleteOrder, tip, setTip, placeOrder } = useOrder();

  const [ state, dispatch ] = useReducer( orderReducer, initialState );

  return (
    <>
      <header className=" bg-teal-400 py-5">
        <h1 className=" text-center text-4xl font-black">Calculadora de Propinas y consumo</h1>
      </header>

      <main className=" max-w-7xl mx-auto my-20 grid md:grid-cols-2">

        <div className=" p-5">
          <h2 className="text-4xl font-black">Menu</h2>
          <div className="space-y-3 mt-10">
            {
              menuItems.map( item => (
                <MenuItems key={ item.id } item={ item } dispatch={ dispatch } />
              ) )
            }
          </div>
        </div>

        {
          state.order && state.order.length > 0 ? (
            <div className=" border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
              <OrderContents order={ state.order } dispatch={ dispatch } />
              <TipPercentageForm tip={ state.tip } dispatch={ dispatch } />
              <OrderTotals order={ state.order } tip={ state.tip } dispatch={ dispatch } />
            </div>

          ) : (
            <p className="font-black text-center">Ingrese para calcular</p>
          )
        }


      </main>

    </>
  )
}

export default App
