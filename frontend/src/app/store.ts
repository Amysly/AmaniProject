import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authslice"
import courseReducer from "../feature/courses/courseSlice"
import departmentReducer from "../feature/departments/departmentSlice"




export const store = configureStore({
    reducer :{
        auth: authReducer,
        courses: courseReducer,
        departments : departmentReducer,

    },
})
// RootState = type of the entire store
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch = type of the dispatch function
export type AppDispatch = typeof store.dispatch;