import { Footer, Guitar, Header } from "./components"
import { useCart } from "./hooks/useCart";

function App() {

  const { emptyCart,
    deleteItem,
    decreaseQuantity,
    increaseQuantity,
    addToCart,
    data,
    cart
  } = useCart();

  return (
    <>
      <Header cart={ cart } onDeleteItem={ deleteItem } decreaseQuantity={ decreaseQuantity } increaseQuantity={ increaseQuantity } emptyCart={ emptyCart } />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            data.map( gui => (
              <Guitar
                key={ gui.id } guitar={ gui }
                onAddCart={ addToCart }
              />
            ) )
          }
        </div>
      </main>
      <Footer />



    </>
  )
}

export default App
