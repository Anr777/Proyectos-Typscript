import { useMemo } from "react";
import { useCryptoStore } from "../store"
import { Spinner } from "./Spinner";


export function CryptoPriceDisplay() {

  const { result, loading } = useCryptoStore();
  const hasResult = useMemo( () => !Object.values( result ).includes( '' ), [ result ] );

  return (
    <div className="result-wrapper">

      {
        loading ? <Spinner /> : hasResult && (
          <>
            <h2>Cotizacion</h2>

            <div className="result">
              <img src={ `https://cryptocompare.com/${ result.IMAGEURL }` } alt="cryto moneda" />
              <div>
                <p>El precio es de: <span>{ result.PRICE }</span></p>
                <p>Precio mas alto del dia: <span>{ result.HIGHDAY }</span></p>
                <p>Precio mas bajo del dia: <span>{ result.LOWDAY }</span></p>
                <p>Variacion ultimas 24 horas: <span>{ result.CHANGEPCT24HOUR }</span></p>
                <p>Ultima actualizacion: <span>{ result.LASTUPDATE }</span></p>
              </div>
            </div>

          </>
        )
      }
    </div>
  )
}

