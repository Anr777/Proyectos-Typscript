import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";


export function Header() {

  const [ searchFilters, setSearchFilters ] = useState({
    ingredient: '',
    category: '',
  });

  const { pathname } = useLocation();

  const isHome = useMemo( () => {
    return pathname === '/'
  }, [ pathname ] );

  //? LLAMADA DE API

  const fetchCategories = useAppStore( state => state.fetchCategories );
  const categories = useAppStore( state => state.categories.drinks );
  const searchRecipes = useAppStore( state => state.searchRecipes );

  const showNotification = useAppStore( state => state.showNotification );
  

  useEffect( () => {
    fetchCategories();
  }, []);

  function handleChange ( e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setSearchFilters( prev => {
      return {
        ...prev,
        [ e.target.name ] : e.target.value,
      }
    })
  }

  function handleSubmit( e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //! TODO: VALIDAR

    if ( Object.values( searchFilters ).includes('') ) {
      showNotification({
        text: 'Todos los campos son obligatorios',
        error: true,
      })
      return;
    }

    //! CONSULTAR LAS RECETAS
    searchRecipes( searchFilters );
  }


  return (
    <header className={ isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800' }>
      <div className=" mx-auto container px-5 py-16">
        <div className=" flex justify-between items-center">

          <div>
            <img className="w-32" src="/logo.svg" alt="logotipo" />
          </div>

          <nav className=" flex gap-4">
            <NavLink to={ '/' }
              className={ ( { isActive } ) => isActive ? ' text-orange-500 uppercase font-bold' : ' text-white uppercase font-bold' }
            >
              Inicio
            </NavLink>
            <NavLink className={ ( { isActive } ) => isActive ? ' text-orange-500 uppercase font-bold' : ' text-white uppercase font-bold' }
              to={ '/favoritos' }
            >
              Favoritos
            </NavLink>
          </nav>

        </div>

        {
          isHome && (
            <form
              className=" md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
              onSubmit={ handleSubmit }
            >
              <div className=" space-y-4">
                <label
                  className="block text-white uppercase font-extrabold text-lg" htmlFor="ingredient"
                >
                  Nombre o Ingredientes
                </label>

                <input id='ingredient' type="text" name='ingredient'
                  className=" p-3 w-full rounded-lg focus:outline-none"
                  placeholder="Nombre o Ingrediente. Ej. Vodja, Tequila, Cafe"
                  value={ searchFilters.ingredient }
                  onChange={ handleChange }
                />
              </div>

              <div className=" space-y-4">
                <label
                  className="block text-white uppercase font-extrabold text-lg" htmlFor="category"
                >
                  Categoria
                </label>

                <select id='category' name='category'
                  className=" p-3 w-full rounded-lg focus:outline-none"
                  value={ searchFilters.category }
                  onChange={ handleChange }
                >
                  <option value="">-- Seleccione --</option>
                  {
                    categories.map( category => (
                      <option key={ category.strCategory } value={ category.strCategory }>{ category.strCategory }</option>
                    ))
                  }
                </select>
              </div>

              <input type="submit" value={ 'Buscar Recetas' }
                className=" cursor-pointer bg-orange-800 hover:placeholder-orange-900 text-white font-extrabold w-full rounded-lg uppercase p-2"
              />
            </form>
          )
        }

      </div>
    </header>
  )
}

