

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { RecipesSliceType, createRecipesSlice } from './recipeSlice';
import { FavoritesSlicetype, createFavoritesSlice } from './favoritesSlice';
import { NotificationSliceType, createNotificationSlice } from './notificationSlice';

export const useAppStore = create<RecipesSliceType & FavoritesSlicetype & NotificationSliceType>()(devtools( ( ...a ) => ({
  ...createRecipesSlice(...a),
  ...createFavoritesSlice(...a),
  ...createNotificationSlice(...a),
})))