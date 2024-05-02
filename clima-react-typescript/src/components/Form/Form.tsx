import { useState } from "react";
import { countries } from "../../data/countries";
import styles from './Form.module.css';
import { SearchType } from "../../types";
import { Alert } from "../Alert/Alert";

type FormProps = {
  fetchWeather: ( search: SearchType ) => Promise<void>;
}

export function Form({ fetchWeather }: FormProps) {

  const [ search, setSearch ] = useState<SearchType>( {
    city: '',
    country: '',
  } );

  const [ alert, setAlert ] = useState('');

  function handleChange( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) {

    const { id, value } = e.target;
    setSearch( prev => {
      return {
        ...prev,
        [ id ]: value,
      }
    } );

  }

  function handleSubmit( e: React.FormEvent<HTMLFormElement> ) {

    e.preventDefault();
    if ( Object.values( search ).includes( '' ) ) {
      setAlert('Todos los campos son obligatorios');
      return;
    }

    fetchWeather( search );
  }

  console.log( search )

  return (
    <form className={ styles.form }
      onSubmit={ handleSubmit }
    >
      {
        alert && <Alert>{ alert }</Alert>
      }

      <div className={ styles.field }>
        <label htmlFor="city">Ciudad:</label>
        <input type="text" id="city" placeholder="Ciudad"
          value={ search.city }
          onChange={ handleChange }
        />
      </div>

      <div className={ styles.field }>
        <label htmlFor="country">Pais:</label>
        <select id="country" value={ search.country }
          onChange={ handleChange }
        >
          <option value="">-- Seleccione un Pais --</option>
          {
            countries.map( country => (
              <option value={ country.code } key={ country.code }>
                { country.name }
              </option>
            ) )
          }
        </select>
      </div>

      <input className={ styles.submit } type="submit" value={ 'Consultar Clima' } />
    </form>
  )
}

