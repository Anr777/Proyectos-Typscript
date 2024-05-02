import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import { ErrorMessage } from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";




export function ExpenseForm() {

  const [ expense, setExpense ] = useState<DraftExpense>( {
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date(),
  } );

  const [ error, setError ] = useState( '' );
  const [ previusAmount, setPreviusAmount ] = useState(0);

  //? USANDO EL CONTEXT
  const { dispatch, state, remainingBudget } = useBudget();

  useEffect( () => {
    if ( state.editingId ) {
      const editingExpense = state.expenses.filter( currentExpense => currentExpense.id === state.editingId )[0];
      setExpense(editingExpense);
      setPreviusAmount(editingExpense.amount);
    }
  }, [ state.editingId ]);

  function handleInputs( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) {
    const { name, value } = e.target;
    const isAmountField = [ 'amount' ].includes( name );
    setExpense( prev => {
      return {
        ...prev,
        [ name ]: isAmountField ? Number( value ) : value,
      }
    } )
  }

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
    //! VALIDAR
    if ( Object.values( expense ).includes( '' ) ) {
      setError( 'Todos los campos son obligatorios...' );
      return;
    }

    setError( '' );

    //! VALIDAR QUE NO ME PASE DEL PRESUPUESTO
    if ( expense.amount - previusAmount > remainingBudget ) {
      setError('Ese gasto sobrepasa del presupuesto');
      return;
    }

    //! AGREGAR O ACTUALIZAR EL GASTO
    if ( state.editingId ) {
      dispatch({ type: "update-expense", payload: { expense: { id: state.editingId, ...expense } }})
    } else {
      dispatch( { type: 'add-expense', payload: { expense } } );

    }

    // Reiniciar el state
    setExpense( {
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date(),
    } );
    setPreviusAmount(0);

  }

  return (
    <form className=" space-y-5" onSubmit={ handleSubmit }>
      <legend className=" uppercase text-center text-2xl font-black border-b-4 border-blue-500 p-2 ">{ state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'}</legend>

      { error && (
        <ErrorMessage>
          { error }
        </ErrorMessage>
      ) }

      <div className=" flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto
        </label>

        <input type="text" id='expenseName' placeholder="Agrega el nombre del gasto"
          className=" bg-slate-100 p-2"
          name='expenseName'
          value={ expense.expenseName }
          onChange={ handleInputs }
        />
      </div>

      <div className=" flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad
        </label>

        <input type="number" id='amount' placeholder="Agrega la cantidad del gasto ej.300"
          className=" bg-slate-100 p-2"
          name='amount'
          value={ expense.amount }
          onChange={ handleInputs }
        />
      </div>

      <div className=" flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Categoria
        </label>

        <select id='category'
          className=" bg-slate-100 p-2"
          value={ expense.category }
          name='category'
          onChange={ handleInputs }
        >

          <option value="">-- Seleccione --</option>
          {
            categories.map( category => (
              <option key={ category.id } value={ category.id }>{ category.name }</option>
            ) )
          }

        </select>

        <div className=" flex flex-col gap-2">
          <label htmlFor="amount" className="text-xl">
            Fecha Gasto:
          </label>

          <DatePicker
            className='bg-slate-100 p-2 border-0'
            value={ expense.date }
            onChange={ handleChangeDate }
          />
        </div>
      </div>

      <input type="submit"
        className=" bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg" value={ state.editingId ? 'Guardar Cambios' : 'Registrar Gasto' } />
    </form>
  )
}

