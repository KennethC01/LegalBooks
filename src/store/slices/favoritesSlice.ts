import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DocumentItem } from '../../constants/types';

interface FavoritesState {
  documents: DocumentItem[];
}

const initialState: FavoritesState = {
  documents: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',

  initialState,

  reducers: {
    setFavorites: (
      state,
      action: PayloadAction<DocumentItem[]>
    ) => {
      state.documents = action.payload;
    },

    addFavorite: (
      state,
      action: PayloadAction<DocumentItem>
    ) => {
      const exists = state.documents.some(
        document => document.id === action.payload.id
      );

      if (!exists) {
        state.documents.push(action.payload);
      }
    },

    removeFavorite: (
      state,
      action: PayloadAction<string>
    ) => {
      state.documents = state.documents.filter(
        document => document.id !== action.payload
      );
    },

    toggleFavorite: (
      state,
      action: PayloadAction<DocumentItem>
    ) => {
      const exists = state.documents.some(
        document => document.id === action.payload.id
      );

      if (exists) {
        state.documents = state.documents.filter(
          document => document.id !== action.payload.id
        );
      } else {
        state.documents.push(action.payload);
      }
    },

    clearFavorites: state => {
      state.documents = [];
    },
  },
});

export const {
  setFavorites,
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;