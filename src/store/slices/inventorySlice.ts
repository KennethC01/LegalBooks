import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DocumentItem {
  id: string;
  name: string;
}

interface InventoryState {
  documents: DocumentItem[];
}

const initialState: InventoryState = { documents: [] };

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addDocument: (state, action: PayloadAction<DocumentItem>) => {
      state.documents.push(action.payload);
    },
    removeDocument: (state, action: PayloadAction<string>) => {
      state.documents = state.documents.filter((doc) => doc.id !== action.payload);
    },
  },
});

export const { addDocument, removeDocument } = inventorySlice.actions;
export default inventorySlice.reducer;