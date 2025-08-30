import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AuthState {
    departments : []
    isError: boolean
    isSuccess : boolean
    isLoading: boolean
    message : string
}

const initialState : AuthState ={
    departments: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};
//slice
export const departmentSlice = createSlice({
    name: 'departments',
    initialState,
    reducers: {
        reset:() => initialState
    },
});

export const {reset} = departmentSlice.actions
export default departmentSlice.reducer;
