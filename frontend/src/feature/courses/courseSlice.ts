import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import courseService from "./courseService";

export interface CourseData {
  courseTitle: string;
  courseCode: string;
  courseUnit: number;
  courseLevel: string;
  coreCourses: string
  isElective: boolean;
  isOutsideElective: boolean;
  allowedDepartments: string[];
  department: string;
}

export interface CourseResponse {
  _id: string;
  courseTitle: string;
  courseCode: string;
  courseUnit: number;
  courseLevel: string;
  coreCourses:string;
  isElective: boolean;
  isOutsideElective: boolean;
  allowedDepartments: string[];
  department: string;
}

interface CourseState {
  adminCourses: CourseResponse[];
  studentsCourses: CourseResponse[];
  coreCourses:CourseResponse[];
  departmentElectives: CourseResponse[];
  outsideElectives: CourseResponse[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

interface UpdateCoursePayload {
  _id: string;
  updatedData: {
    courseTitle?: string;
    courseCode?: string;
    courseUnit?: number;
    department?: string;
  };
}


const initialState: CourseState = {
  adminCourses: [],
  studentsCourses: [],
  coreCourses:[],
  departmentElectives: [],
  outsideElectives: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// ======================
// Thunks
// ======================

// Create course
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

// Get courses for students
export const getCoursesByStudents = createAsyncThunk<
  {
    allCourses: CourseResponse[];
    coreCourses: CourseResponse[];
    deptElective: CourseResponse[];
    outsideElectives: CourseResponse[];
  },
  string,
  { rejectValue: string }
>("course/getAllCourseByStudents", async (departmentId: string, thunkAPI) => {
  try {
    const token = (thunkAPI.getState() as any).auth.user.token;
    return await courseService.getCoursesByStudents(token, departmentId);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get all courses (Admin)
export const getCoursesByAdmin = createAsyncThunk<
  CourseResponse[],
  void,
  { rejectValue: string }
>("course/getAllCourseByAdmin", async (_, thunkAPI) => {
  try {
    const token = (thunkAPI.getState() as any).auth.user.token;
    return await courseService.getCoursesByAdmin(token);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update course
export const updateCourse = createAsyncThunk<
  CourseResponse,
  UpdateCoursePayload,
  { rejectValue: string }
>("courses/updateCourse", async (payload, thunkAPI) => {
  try {
    const token = (thunkAPI.getState() as any).auth.user?.token;
    return await courseService.updateCourse(payload, token);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete course
export const deleteCourse = createAsyncThunk<
  { id: string; message: string },
  string,
  { rejectValue: string }
>("courses/deleteCourse", async (id, thunkAPI) => {
  try {
    const token = (thunkAPI.getState() as any).auth.user?.token;
    return await courseService.deleteCourse(id, token);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// ======================
// Slice
// ======================
export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create course
      .addCase(createCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.adminCourses.push(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // Get all courses (Admin)
      .addCase(getCoursesByAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoursesByAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.adminCourses = action.payload;
      })
      .addCase(getCoursesByAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // Get student courses
      .addCase(getCoursesByStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoursesByStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.studentsCourses = action.payload.allCourses || [];
        state.coreCourses = action.payload.coreCourses || [];
        state.departmentElectives = action.payload.deptElective || [];
        state.outsideElectives = action.payload.outsideElectives || [];
      })
      .addCase(getCoursesByStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // Update course
      .addCase(updateCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action: PayloadAction<CourseResponse>) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.adminCourses.findIndex((u) => u._id === action.payload._id);
        if (index !== -1) {
          state.adminCourses[index] = action.payload;
        }
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // Delete course
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action: PayloadAction<{ id: string; message: string }>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.adminCourses = state.adminCourses.filter(course => course._id !== action.payload.id);
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
