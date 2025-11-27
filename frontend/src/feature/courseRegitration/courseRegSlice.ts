import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import courseRegService from "./courseRegService";



interface CourseItem {
  courseTitle: string;
  courseCode: string;
  courseUnit: number;
}

interface SemesterData {
  compulsoryCourses: CourseItem[];
  departmentElectives: CourseItem[];
  outsideElectives: CourseItem[];
  totalSemesterUnits: number;
}

interface SessionData {
  semesters: Record<string, SemesterData>; // e.g "First Semester"
  totalSessionUnits: number;
}

interface RegisteredCoursesResponse {
  [session: string]: SessionData;
}

interface CourseRegState {
 CourseRegistration: RegisteredCoursesResponse | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

 interface updateCourseFormPayload{
    id:string;
    updateData : {
      courses?:  string; departmentElectives?: string;
       outsideElectives?: string;
    }
}


const initialState: CourseRegState = {
  CourseRegistration: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register courses
export const registerCourse = createAsyncThunk<
  any,
  any,
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

// Get all registered courses
export const getAllRegisteredCourses = createAsyncThunk<
  RegisteredCoursesResponse,
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

//update course registration course form
export const updateCourseForm = createAsyncThunk<
   RegisteredCoursesResponse,
  updateCourseFormPayload,
  { rejectValue: string }
>("courseregistration/updateCourseForm", async (payload, thunkAPI) => {
  try {
    const token = (thunkAPI.getState() as any).auth.user?.token;
    return await courseRegService.updateCourseForm(payload, token);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});




export const courseRegSlice = createSlice({
  name: "coursereg",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerCourse.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
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
        state.CourseRegistration = action.payload; // this now matches backend
      })
      .addCase(getAllRegisteredCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      //update course registration form
     .addCase(updateCourseForm.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateCourseForm.fulfilled, (state, action: PayloadAction<RegisteredCoursesResponse>) => {
            state.isLoading = false;
            state.isSuccess = true;
             state.CourseRegistration = action.payload;
          })
          .addCase(updateCourseForm.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload as string;
          })
    
  },
});

export const { reset } = courseRegSlice.actions;
export default courseRegSlice.reducer;
