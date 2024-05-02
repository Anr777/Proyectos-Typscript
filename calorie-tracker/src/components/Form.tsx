
import { useEffect, useState } from "react";
import { categories } from "../data/categories";
import { v4 as uuidv4 } from 'uuid';
import { Activity } from "../types";
import { useActivity } from '../hooks/useActivity';


// type FormProps = {
//   dispatch: Dispatch<ActivityActions>;
//   state: ActivityState
// }

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories: 0,
}

export function Form() {

  const { state, dispatch } = useActivity();

  const [ activity, setActivity ] = useState<Activity>( initialState );

  useEffect( () => {
    if ( state.activeId ) {
      const selectActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId )[ 0 ];
      setActivity( selectActivity );


    }
  }, [ state.activeId ] );

  function handleChange( e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement> ) {
    const id = e.target.id;
    const isNumberField = [ 'category', 'calories' ].includes( id )
    const value = e.target.value;
    console.log( e.target.value );
    setActivity( prev => {
      return {
        ...prev,
        [ id ]: isNumberField ? Number( value ) : value,
      }
    } )

  }

  function isValidActivity() {

    const { name, calories } = activity;
    return name.trim() !== '' && calories > 0;

  }

  function handleSubmit( e: React.ChangeEvent<HTMLFormElement> ) {
    e.preventDefault();
    console.log( 'submit' );
    dispatch( {
      type: 'save-activity',
      payload: { newActivity: activity }
    } );
    setActivity( {
      ...initialState,
      id: uuidv4(),
    } );
  }


  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={ handleSubmit }
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categorias</label>
        <select className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category" value={ activity.category } onChange={ handleChange }
        >
          { categories.map( category => (
            <option id="category" value={ category.id } key={ category.id }>{ category.name }</option>
          ) ) }
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">Actividad:</label>
        <input id='name' type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Juno de Naranja, Pesas, Ejercicios, etc"
          value={ activity.name }
          onChange={ handleChange }
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">Calorias:</label>
        <input id='calories' type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. 300 o 500"
          value={ activity.calories }
          onChange={ handleChange }
        />
      </div>

      <input type="submit" className="bg-slate-800 hover:bg-slate-950 w-full p-2 font-black uppercase text-white cursor-pointer disabled:opacity-10" value={ activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio' } disabled={ !isValidActivity() } />

    </form>
  )
}

