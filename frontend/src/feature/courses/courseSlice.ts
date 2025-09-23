import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import courseService from "./courseService";


export interface CourseData {
  courseTitle: string;
  courseCode: string;
  courseUnit: number;
  department: string; 
}

// data you receive from backend
export interface CourseResponse {
  id: string;
  courseTitle: string;
  courseCode: string;
  courseUnit: number;
  department: string;
  createdAt: string;
  updatedAt: string;
}

interface CourseState {
  courses: CourseResponse[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: CourseState = {
  courses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create new course
export const createCourse = createAsyncThunk<
  CourseResponse,  
  CourseData,   
  { rejectValue: string }
>("course/create", async (courseData, thunkAPI) => {
  try {
    const token = (thunkAPI.getState() as any).auth.user.token;
    return await courseService.createCourse(courseData, token);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// get all courses
export const getCourses = createAsyncThunk<
  CourseResponse[],   
  void,             
  { rejectValue: string }
>("course/getAll", async (_, thunkAPI) => {
  try {
    const token = (thunkAPI.getState() as any).auth.user.token;
    return await courseService.getCourses(token);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courses.push(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courses = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = courseSlice.actions;
export default courseSlice.reducer;
