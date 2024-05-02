
import { StateCreator } from 'zustand'
import { Recipe } from '../types'
import { NotificationSliceType, createNotificationSlice } from './notificationSlice';
import { RecipesSliceType } from './recipeSlice';

export type FavoritesSlicetype = {

  favorites: Recipe[];
  handleClickFavorite: ( recipe: Recipe ) => void;
  favoriteExists: ( id : Recipe['idDrink'] ) => boolean;
  loadFromStorage: () => void;
}

export const createFavoritesSlice : StateCreator<FavoritesSlicetype & RecipesSliceType & NotificationSliceType, [], [], FavoritesSlicetype> = ( set, get, api ) => ({
  favorites: [],
  handleClickFavorite: ( recipe ) => {
   if ( get().favorites.some( favorite => favorite.idDrink === recipe.idDrink )) {
    set( state => ({
      favorites: state.favorites.filter( favorite => favorite.idDrink !== recipe.idDrink ),
      modal: false,
    }));

    createNotificationSlice(set, get, api).showNotification(
      { 
        text: 'Se elimino de favoritos', 
        error: false,
      })

   } else {
    console.log('No existe')
    set( state => ({
      favorites: [...state.favorites, recipe],
      modal: false,
    }));

    createNotificationSlice(set, get, api).showNotification(
      { 
        text: 'Se agrego a favoritos', 
        error: false,
      })
   }
   localStorage.setItem('favorites', JSON.stringify(get().favorites));
  },

  favoriteExists: ( id ) => {
    return get().favorites.some( favorite => favorite.idDrink === id);
  },

  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem('favorites');

    if ( storedFavorites ) {
      set({
        favorites: JSON.parse(storedFavorites)
      })
    }
  }


})