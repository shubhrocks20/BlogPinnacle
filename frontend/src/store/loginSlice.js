import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{
        addUser(state, action){
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = null;
        }
        
    }
})

export const { addUser, clearUser } = loginSlice.actions

export default loginSlice.reducer;