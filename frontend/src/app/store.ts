import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authslice"
import courseReducer from "../feature/courses/courseSlice"
import departmentReducer from "../feature/departments/departmentSlice"
import resultReducer from "../feature/result/resultSlice"
import courseregReducer from "../feature/courseRegitration/courseRegSlice"




export const store = configureStore({
    reducer :{
        auth: authReducer,
        courses: courseReducer,
        departments : departmentReducer,
        result: resultReducer,
        coursereg: courseregReducer
    },
})
// RootState = type of the entire store
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch = type of the dispatch function
export type AppDispatch = typeof store.dispatch;