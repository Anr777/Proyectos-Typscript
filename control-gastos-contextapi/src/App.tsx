import { useMemo, useRef } from "react";
import { BudgetForm, BudgetTracker, ExpenseForm, ExpenseList, Modal } from "./components";
import { useBudget } from "./hooks/useBudget";
import { PlusCircleIcon } from "@heroicons/react/24/solid";


function App() {

  const modal = useRef( null );
  const { state, } = useBudget();
  const isValidBudget = useMemo( () => {
    return state.budget > 0
  }, [ state.budget ] );

  const openModal = () => {
    if ( modal.current ) {
      modal.current?.open();

    }
  }


  return (
    <>
     {/* <main className=" max-w-3xl mx-auto py-10 bg-red-600"> */}
       <Modal ref={ modal }>
         <ExpenseForm />
       </Modal>
     {/* </main> */}

      <header className=" bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de Gastos
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {
          isValidBudget ? (
            <BudgetTracker />
          )
            : (
              <BudgetForm />
            )
        }
      </div>

      {
        isValidBudget && (
         
           <main className=" max-w-3xl mx-auto py-10">

            <ExpenseList />

            <div className="fixed right-5 bottom-5 flex items-center justify-center">
              <button
                onClick={ openModal }
                type="button"
              >
                <PlusCircleIcon className='w-16 h-16 text-blue-600 rounded-full' />
              </button>
            </div>
           </main>
      
        )
      }

      {/* <ExpenseModal /> */ }
    </>

  )
}

export default App
