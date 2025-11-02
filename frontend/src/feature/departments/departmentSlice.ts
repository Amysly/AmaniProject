import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import departmentservice from "./departmentService";

//what you send TO the backend
export interface DepartmentData {
  departmentName: string;
  totalCreditUnitPerSession: number;
  minCreditUnitPerSemester: number;
  maxCreditUnitPerSemester: number;
}

// what you RECEIVE from the backend
export interface DepartmentResponse {
  id: string; 
  departmentName: string;
  totalCreditUnitPerSession: number;
  minCreditUnitPerSemester: number;
  maxCreditUnitPerSemester: number;
  createdAt: string;
  updatedAt: string;
}

interface DepartmentState {
  departments: DepartmentResponse[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: DepartmentState = {
  departments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create new department
export const createDepartment = createAsyncThunk<
  DepartmentResponse,   
 DepartmentData,      
  { rejectValue: string }
>("department/create", async (departmentData, thunkAPI) => {
  try {
    const token = (thunkAPI.getState() as any).auth.user.token;
    return await departmentservice.createDepartment(departmentData, token);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


// get all departments
export const getDepartments = createAsyncThunk<
  DepartmentResponse[],
  void,
  { rejectValue: string }
>("departments/getAll", async (_, thunkAPI) => {
  try {
    return await departmentservice.getDepartments();
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


export const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDepartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.departments.push(action.payload);
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to create department";
      })
      .addCase(getDepartments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.departments = action.payload;
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch departments";
      });
  },
});

export const { reset } = departmentSlice.actions;
export default departmentSlice.reducer;
