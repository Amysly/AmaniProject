import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import courseRegService from "./courseRegService";

interface CourseRegData {
    session:string;
    semester:string;
    gender:string;
    courses:string [];
}

interface CourseRegResponse {
     _id: string;
    session:string;
    semester:string;
    gender:string;
     courses:string [];
}

interface CourseRegState {
    CourseRegistration:CourseRegResponse[];
    isError: boolean;
    isLoading:boolean;
    isSuccess: boolean;
    message:string;
}

const initialState:CourseRegState ={
CourseRegistration: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

//course registration
export const registerCourse = createAsyncThunk<
CourseRegResponse,
CourseRegData,
{rejectValue:string}
>('courseregistration/create', async(courseRegData,thunkAPI)=>{
    try{
        const token =(thunkAPI.getState()as any).auth.user.token;
        return await courseRegService.registerCourse(courseRegData,token)
    }catch(error:any){
        const message =
        error.response?.data?.message || error.message || error.toString()
         return thunkAPI.rejectWithValue(message);
    }
});

export const courseRegSlice = createSlice({
    name:'coursereg',
    initialState,
    reducers:{
        reset:()=>initialState
    },
    extraReducers(builder) {
        builder
        .addCase(registerCourse.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(registerCourse.fulfilled,(state,Action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.CourseRegistration.push(Action.payload)
        })
        .addCase(registerCourse.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload as string;
        })
    },
})

export const { reset } = courseRegSlice.actions;
export default courseRegSlice.reducer;
