import { useAppStore } from "../stores/useAppStore";
import type { Drink } from "../types";


type DrinkCardProps = {
  drink: Drink;
}

//www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

export function DrinkCard({ drink } : DrinkCardProps ) {

  const selectRecipe = useAppStore( state => state.selectRecipe );

  return (
    <div className=" border shadow-lg">

      <div className=" overflow-hidden">
        <img src={ drink.strDrinkThumb } alt={`Imagen de ${ drink.strDrink }`} 
          className=" hover:scale-110 cursor-pointer transition-transform hover:rotate-2"
        />
      </div>

      <div className=" p-5">
        <h2 className=" text-2xl truncate font-black">
          { drink.strDrink }
        </h2>

        <button type="button" 
          onClick={ () => selectRecipe(drink.idDrink) }
          className=" bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg">
          Ver Receta
        </button>


      </div>
    </div>
  )
}

