import { useState } from "react";
import { currencies } from "../data";
import { useCryptoStore } from "../store";
import { Pair } from "../types";
import { ErrorMessage } from ".";

export function CriptoSearchForm() {

  const { cryptocurrencies, fetchData, loading } = useCryptoStore();
  const [ pair, setPair ] = useState<Pair>({
    currency: '',
    criptocurrency: '',
  });

  const [ error, setError ] = useState('');

  function handleChange( e : React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;

    setPair( prev => {
      return {
        ...prev,
        [ name ] : value,
      }
    })
  }

  function handleSubmit( e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if ( Object.values(pair).includes('') ) {
      setError('Todos los campos son requeridos');
      return
    }

    setError('');

    fetchData( pair );

  }

  return (
    <form className="form" onSubmit={ handleSubmit }>
      {
        error && <ErrorMessage>{ error }</ErrorMessage>
      }
      <div className="field">
        <label htmlFor="currency">Moneda:</label>
        <select name="currency" id="currency"
          value={ pair.currency }
          onChange={ handleChange }
        >
          <option>-- Seleccione --</option>
          {
            currencies.map( currency => (
              <option key={ currency.code } value={ currency.code }>{ currency.name }</option>
            ))
          }
        </select>
      </div>

      <div className="field">
        <label htmlFor="criptocurrency">Criptomoneda:</label>
        <select name="criptocurrency" id="criptocurrency"
          value={ pair.criptocurrency }
          onChange={ handleChange }
        >
          <option>-- Seleccione --</option>
          {
            cryptocurrencies.map( crypto => (
              <option key={ crypto.CoinInfo.Name } value={ crypto.CoinInfo.Name }>{ crypto.CoinInfo.FullName }</option>
            ))
          }
        </select>
      </div>

      <input type="submit" value={'Cotizar'} disabled={ loading } />
    </form>
  )
}

