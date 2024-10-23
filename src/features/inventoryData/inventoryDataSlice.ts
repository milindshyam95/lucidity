import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchInventoryData } from './inventoryDataApi';

export interface InventoryDataType{
    name: string;
    category: string;
    value: string;
    quantity: number;
    price: string;
}

interface InventoryStatsType{
    totalProducts: number;
    totalStoreValue: number;
    outOfStock: number;
    categories: number;
}

export interface InventoryDataState {
  data: InventoryDataType[];
  hiddenItems: string[],
  inventoryStats: InventoryStatsType,
  loading: boolean;
  error: string  
}

const initialInventoryStats: InventoryStatsType = {
    totalProducts: 0,
    totalStoreValue: 0,
    outOfStock: 0,
    categories: 0
}

const initialState: InventoryDataState = {
  data: [],
  hiddenItems: [],
  inventoryStats: initialInventoryStats,
  loading: false,
  error: ''  
};

export const fetchData = () => async (dispatch:Dispatch) => {
    dispatch(fetchDataLoading());
    await fetchInventoryData()
    .then(response => {
        if(response.status === 200){
            dispatch(fetchDataSuccess(response.data));
        }
        else{
            dispatch(fetchDataFailed());
        }
    })
    .catch(error => console.log(error));
}

export const inventoryDataSlice = createSlice({
  name: 'inventoryData',
  initialState,  
  reducers: {    
    deleteInventoryData: (state, action) => {
        state.data = state.data.filter(
            (data: InventoryDataType) => data.name !== action.payload
          );
        let totalStoreValue = 0
        state.data.forEach((item: InventoryDataType) => {
            if(!state.hiddenItems.includes(item.name)){
                var number = Number(item.value.replace(/[^0-9.-]+/g,""));
                totalStoreValue += number
            }
        })
        let categories = new Set()
        state.data.forEach((item: InventoryDataType) => {
            if(!state.hiddenItems.includes(item.name)){
                categories.add(item.category)
            }
        })
          state.inventoryStats = {
            totalProducts: state.data.filter((item: InventoryDataType) => !state.hiddenItems.includes(item.name)).length,
            totalStoreValue: totalStoreValue,
            outOfStock: state.data.filter((item: InventoryDataType) => !state.hiddenItems.includes(item.name) && item.quantity === 0).length,
            categories: categories.size
        } 
    },
    changeVisibility: (state, action) => {        
        if(state.hiddenItems.includes(action.payload)){            
            state.hiddenItems = state.hiddenItems.filter(item => item !== action.payload)
        }
        else{            
            state.hiddenItems = [...state.hiddenItems, action.payload]
        }
        let totalStoreValue = 0
        state.data.forEach((item: InventoryDataType) => {
            if(!state.hiddenItems.includes(item.name)){
                var number = Number(item.value.replace(/[^0-9.-]+/g,""));
                totalStoreValue += number
            }
        })
        let categories = new Set()
        state.data.forEach((item: InventoryDataType) => {
            if(!state.hiddenItems.includes(item.name)){
                categories.add(item.category)
            }
        })
        state.inventoryStats = {
            totalProducts: state.data.filter((item: InventoryDataType) => !state.hiddenItems.includes(item.name)).length,
            totalStoreValue: totalStoreValue,
            outOfStock: state.data.filter((item: InventoryDataType) => !state.hiddenItems.includes(item.name) && item.quantity === 0).length,
            categories: categories.size
        }
    },
    updateInventoryData: (state, action) => {
        state.data = state.data.map((data: InventoryDataType) => {
            if (data.name === action.payload.name) {
              return {
                ...action.payload,                
              };
            }
            return data;
        });
        let totalStoreValue = 0
        state.data.forEach((item: InventoryDataType) => {
            if(!state.hiddenItems.includes(item.name)){
                var number = Number(item.value.replace(/[^0-9.-]+/g,""));
                totalStoreValue += number
            }
        })
        let categories = new Set()
        state.data.forEach((item: InventoryDataType) => {
            if(!state.hiddenItems.includes(item.name)){
                categories.add(item.category)
            }
        })
          state.inventoryStats = {
            totalProducts: state.data.filter((item: InventoryDataType) => !state.hiddenItems.includes(item.name)).length,
            totalStoreValue:totalStoreValue,
            outOfStock: state.data.filter((item: InventoryDataType) => !state.hiddenItems.includes(item.name) && item.quantity === 0).length,
            categories: categories.size
        }
    },
    fetchDataLoading: (state) => {
        state.loading = true;
        state.error = '';
    },
    fetchDataSuccess: (state, action) => {            
        state.loading = false;
        state.data = action.payload.filter((data:InventoryDataType) => ({...data, isHidden: false}));
        state.error = '';
        let totalStoreValue = 0
        state.data.forEach((item: InventoryDataType) => {
            if(!state.hiddenItems.includes(item.name)){
                var number = Number(item.value.replace(/[^0-9.-]+/g,""));
                totalStoreValue += number
            }
        })
        let categories = new Set()
        state.data.forEach((item: InventoryDataType) => {
            if(!state.hiddenItems.includes(item.name)){
                categories.add(item.category)
            }
        })
        state.inventoryStats = {
            totalProducts: state.data.filter((item: InventoryDataType) => !state.hiddenItems.includes(item.name)).length,
            totalStoreValue: totalStoreValue,
            outOfStock: state.data.filter((item: InventoryDataType) => !state.hiddenItems.includes(item.name) && item.quantity === 0).length,
            categories: categories.size
        }
    },
    fetchDataFailed: (state) => {
        state.loading = false;
        state.data = []
        state.error = 'There was an error fetching data'
    }
  },
});

export const { fetchDataLoading, fetchDataSuccess, fetchDataFailed, deleteInventoryData, changeVisibility, updateInventoryData } = inventoryDataSlice.actions;

export const selectInventoryData = (state: RootState) => state.inventoryData.data;
export const selectHiddenInventoryItems = (state: RootState) => state.inventoryData.hiddenItems;
export const selectTotalProducts = (state: RootState) => state.inventoryData.inventoryStats.totalProducts;
export const selectTotalStoreValue = (state: RootState) => state.inventoryData.inventoryStats.totalStoreValue;
export const selectOutOfStock = (state: RootState) => state.inventoryData.inventoryStats.outOfStock;
export const selectCategories = (state: RootState) => state.inventoryData.inventoryStats.categories;

export default inventoryDataSlice.reducer;
