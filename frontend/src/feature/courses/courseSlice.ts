import { createSlice, createAsyncThunk, type PayloadAction  } from "@reduxjs/toolkit";
import courseService from "./courseService";


export interface CourseData {
  courseTitle: string;
  courseCode: string;
  courseUnit: number;
  department: string; 
}

// data  receive from backend
export interface CourseResponse {
  _id: string;
  courseTitle: string;
  courseCode: string;
  courseUnit: number;
  department: string;
}

interface CourseState {
  courses: CourseResponse[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

interface UpdateCoursePayload {
  _id: string;
   updatedData: {  courseTitle?: string;  courseCode?: string; 
  courseUnit?:number ; department?: string;};
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

// update course
export const updateCourse = createAsyncThunk<
CourseResponse,
  UpdateCoursePayload,
  { rejectValue: string }
>(
  'courses/updateCourse',
  async (payload, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as any).auth.user?.token;
      return await courseService.updateCourse(payload, token);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//delete course

export const deleteCourse = createAsyncThunk<
  { id: string; message: string }, // response type
  string,                           // argument type (course ID)
  { rejectValue: string }           // error type
>(
  "courses/deleteCourse", // fixed action name
  async (id, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as any).auth.user?.token;
      return await courseService.deleteCourse(id, token);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const courseSlice = createSlice({
  name: "courses",
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
      })
        //update course
            .addCase(updateCourse.pending, (state) => {
              state.isLoading = true;
            })
           .addCase(updateCourse.fulfilled, (state, action: PayloadAction<CourseResponse>) => {
              state.isLoading = false;
              state.isSuccess = true;
      
              const index = state.courses.findIndex((u) => u._id === action.payload._id);
              if (index !== -1) {
                state.courses[index] = action.payload; // updated course replaces old one
              }
            })

       // deletecourse
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action: PayloadAction<{ id: string; message: string }>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courses = state.courses.filter(course => course._id !== action.payload.id);
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = courseSlice.actions;
export default courseSlice.reducer;
