import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userTypeReducer from '../features/userToggle/userToggleSlice';
import inventoryDataReducer from '../features/inventoryData/inventoryDataSlice';
import editDataReducer from '../features/editData/editDataSlice';

export const store = configureStore({
  reducer: {
    userType: userTypeReducer,
    inventoryData: inventoryDataReducer,
    editData: editDataReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
