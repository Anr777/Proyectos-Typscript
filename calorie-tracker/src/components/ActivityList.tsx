import { useMemo } from "react";
import { Activity } from "../types";
import { categories } from "../data/categories";
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useActivity } from "../hooks/useActivity";



export function ActivityList() {

  const { state, dispatch } = useActivity();

  const categoryName = useMemo(
    () => (
      category: Activity[ 'category' ]
    ) => categories.map( cat => cat.id === category ? cat.name : '' )
    , [ state.activities ] );

  return (
    <>
      <h2 className="text-4xl font-black text-slate-600 text-center">
        Comida y Actividades
      </h2>

      {
        !state.activities.length ? <p className="text-center font-black text-2xl">No hay actividades aun...</p> : state.activities.map( activities => (
          <div key={ activities.id } className="px-5 py-10 bg-white mt-5 flex justify-between">

            <div className="space-y-2 relative">
              <p className={ `absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${ activities.category === 1 ? 'bg-lime-500' : 'bg-orange-500' }` }>{ categoryName( +activities.category ) }</p>
              <p className="text-2xl font-black pt-5">{ activities.name }</p>
              <p className="font-black text-4xl text-lime-500">
                { activities.calories } { '' }
                <span>Calorias</span>
              </p>
            </div>

            <div className="flex gap-5 items-center">
              <button onClick={ () => dispatch( { type: 'set-activeId', payload: { id: activities.id } } ) }>
                <PencilSquareIcon className="h-8 w-8 text-gray-800" />
              </button>
              <button onClick={ () => dispatch( { type: 'remove-activity', payload: { id: activities.id } } ) }>
                <XCircleIcon className="h-8 w-8 text-red-500" />
              </button>
            </div>
          </div>
        ) )
      }
    </>
  )
}

