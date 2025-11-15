import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import courseRegService from "./courseRegService";

// ======================
// Types
// ======================
interface CourseRegData {
  session: string;
  semester: string;
  gender: string;
  courses: string[];
  departmentElectives: string[];
  outsideElectives: string[];
}

interface CourseRegResponse {
  _id: string;
  session: string;
  semester: string;
  gender: string;
  courses: string[];
  departmentElectives: string[];
  outsideElectives: string[];
}

interface CourseRegState {
  courseRegistrations: CourseRegResponse[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

// ======================
// Initial State
// ======================
const initialState: CourseRegState = {
  courseRegistrations: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// ======================
// Thunks
// ======================

// Register courses
export const registerCourse = createAsyncThunk<
  CourseRegResponse,
  CourseRegData,
  { rejectValue: string }
>("courseregistration/create", async (courseRegData, thunkAPI) => {
  try {
    const token = (thunkAPI.getState() as any).auth.user.token;
    return await courseRegService.registerCourse(courseRegData, token);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get all registered courses (for logged-in student)
export const getAllRegisteredCourses = createAsyncThunk<
  CourseRegResponse[],
  void,
  { rejectValue: string }
>("courseregistration/getAll", async (_, thunkAPI) => {
  try {
    const token = (thunkAPI.getState() as any).auth.user.token;
    return await courseRegService.getAllRegisteredCourses(token);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// ======================
// Slice
// ======================
export const courseRegSlice = createSlice({
  name: "coursereg",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Register courses
      .addCase(registerCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courseRegistrations.push(action.payload);
      })
      .addCase(registerCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // Get all registered courses
      .addCase(getAllRegisteredCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRegisteredCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courseRegistrations = action.payload;
      })
      .addCase(getAllRegisteredCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = courseRegSlice.actions;
export default courseRegSlice.reducer;
