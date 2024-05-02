import { useEffect } from "react";
import { CriptoSearchForm, CryptoPriceDisplay } from "./components"
import { useCryptoStore } from "./store"


function App() {
 
  const fetchCryptos = useCryptoStore( state => state.fetchCryptos );

  useEffect( () => {
    fetchCryptos()
    // https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="app-title">
          Cotizador de <span>Criptomonedas</span>
        </h1>

        <div className="content">
          <CriptoSearchForm />
          <CryptoPriceDisplay />
        </div>
      </div>
    </>
  )
}

export default App
