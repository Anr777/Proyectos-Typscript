import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ChangeEvent, useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import { ErrorMessage } from ".";
import { useBudget } from "../hooks/useBudget";


type Event = ChangeEvent<HTMLInputElement | HTMLSelectElement>



export function ExpenseForm() {


  const [ expense, setExpense ] = useState<DraftExpense>( {
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date(),
  } );

  const [ error, setError ] = useState( '' );

  //? USANDO EL CONTEXT
  const { dispatch, state } = useBudget();

  useEffect( () => {
    if ( state.editingId ) {
      const editingExpense = state.expenses.filter( currentExpense => currentExpense.id === state.editingId )[0];

      setExpense(editingExpense);
    }
  }, [ state.editingId ]);

  //? FUNCTION PARA CERRAR EL MODAL

  

  function handleChange( e: Event ) {
    const { name, value } = e.target;
    const isAmountField = [ 'amount' ].includes( name );

    setExpense( prev => {
      return {
        ...prev,
        [ name ]: isAmountField ? Number( value ) : value,
      }
    } )
  }


  //? OnChange para la fecha
  function handleChangeDate( value: Value ) {
    setExpense( prev => {
      return {
        ...prev,
        date: value,
      }
    } )
  }

  function handleSubmit( e: React.FormEvent<HTMLFormElement> ) {
    e.preventDefault();

    //? VALIDAR
    if ( Object.values( expense ).includes( '' ) ) {
      setError( 'Todos los Campos son obligatorios' );
      return;
    }
    setError( '' );

    //! AGREGANDO O ACTUALIZAR EL GASTO
    if ( state.editingId ) {
      dispatch({
        type: 'update-expense',
        payload: { expense: { id: state.editingId, ...expense }}
      })
      setExpense({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date(),
      })
    } else {
      dispatch({
        type: 'add-expense',
        payload: { expense }
      });
      setExpense({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date(),
      })
    }

    //! REINICIAR EL STATE

    // setExpense({
    //   amount: 0,
    //   expenseName: '',
    //   category: '',
    //   date: new Date(),
    // })
  }


  return (
    <form className="space-y-5" onSubmit={ handleSubmit }>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        Nuevo Gasto
      </legend>

      { 
        error && (
          <ErrorMessage>
            { error }
          </ErrorMessage>
        )
      }
      <div className=" flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">Nombre Gasto:</label>
        <input type="text" id="expenseName" placeholder="Agrega el nombre del gasto"
          className="bg-slate-100 p-2"
          name="expenseName"
          value={ expense.expenseName }
          onChange={ handleChange }
        />
      </div>

      <div className=" flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">Cantidad:</label>
        <input type="number" id="amount" placeholder="Agrega la cantidad del gasto: ej.300"
          className="bg-slate-100 p-2"
          name="amount"
          value={ expense.amount }
          onChange={ handleChange }
        />
      </div>

      <div className=" flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">Categoria:</label>
        <select id="category"
          className="bg-slate-100 p-2"
          name="category"
          value={ expense.category }
          onChange={ handleChange }
        >
          <option value=""> -- Seleccione -- </option>
          {
            categories.map( category => (

              <option value={ category.id }
                key={ category.id }
              >
                { category.name }
              </option>
            ) )
          }
        </select>
      </div>

      <div className=" flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">Fecha Gasto:</label>
        <DatePicker className='bg-slate-100 p-2 border-0'
          value={ expense.date }
          onChange={ handleChangeDate }
        />
      </div>

      <input type="submit" className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" value='Registrar Gasto' />
    </form>
  )
}

