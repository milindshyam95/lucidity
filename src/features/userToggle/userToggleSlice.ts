import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UserState {
  isAdmin: boolean
}

const initialState: UserState = {
  isAdmin: false
};

export const userTypeSlice = createSlice({
  name: 'userType',
  initialState,  
  reducers: {    
    switchUserType: (state) => {
        if(state.isAdmin)
            state.isAdmin = false
        else 
        state.isAdmin = true      
    },    
  },
});

export const { switchUserType } = userTypeSlice.actions;
export const selectUserType = (state: RootState) => state.userType.isAdmin;

export default userTypeSlice.reducer;
