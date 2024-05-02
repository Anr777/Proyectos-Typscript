import { useMemo } from "react";
import { CalorieDisplay } from ".";
import { useActivity } from "../hooks/useActivity";



export function CalorieTracker() {

  const { state } = useActivity();

  //? CONTADORES DE CALORIAS
  const caloriesConsumed = useMemo( () => {
 
     return state.activities.reduce(( total, activity ) => activity.category === 1 ? total + activity.calories : total, 0);
  
  }, [state.activities]);

  const caloriesBurned = useMemo( () => {
    return state.activities.reduce( ( total, activity ) => activity.category === 2 ? activity.calories + total : total, 0);
  }, [state.activities]);

  const netCalories = useMemo( () => {
    return caloriesConsumed - caloriesBurned
  }, [state.activities]);

  return (
    <>
      <h2 className=" text-4xl font-black text-white text-center">
        Resumen de Calorias
      </h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay text='consumidas' calories={ caloriesConsumed } />
        <CalorieDisplay text='quemadas' calories={ caloriesBurned } />
        <CalorieDisplay text='Diferencia' calories={ netCalories } />

      </div>

    </>
  )
}

