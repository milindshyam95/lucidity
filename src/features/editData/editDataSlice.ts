import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { InventoryDataType } from '../inventoryData/inventoryDataSlice';

const initialState: InventoryDataType = {
  name: '',
  category: '',
  value: '',
  quantity: 0,
  price: '',  
};

export const editDataSlice = createSlice({
  name: 'editData',
  initialState,  
  reducers: {    
    editName: (state, action) => {
        state.name = action.payload
    },
    editCategory: (state, action) => {
        state.category = action.payload
    },
    editPrice: (state, action) => {
        state.price = action.payload
    },
    editQuantity: (state, action) => {
        state.quantity = action.payload
    },
    editValue: (state, action) => {
        state.value = action.payload
    }
  },
});

export const { editName, editCategory, editPrice, editQuantity, editValue } = editDataSlice.actions;

export const selectEditDataName = (state: RootState) => state.editData.name;
export const selectEditDataCategory = (state: RootState) => state.editData.category;
export const selectEditDataPrice = (state: RootState) => state.editData.price;
export const selectEditDataQuantity = (state: RootState) => state.editData.quantity;
export const selectEditDataValue = (state: RootState) => state.editData.value;

export default editDataSlice.reducer;
