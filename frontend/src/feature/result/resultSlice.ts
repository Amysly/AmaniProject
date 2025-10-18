import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import resultService from "./reusltService";

// Correct Course interface
export interface Course {
  courseTitle: string;
  courseCode: string;
  creditUnit: number;
  department?: string;
}

//  Data sent to backend
export interface ResultData {
  session: string;
  semester: string;
  level: string;
  score: number;
  grade?: string;
  course: string; // likely sending course ID, not full object
}

// Data received from backend
export interface ResultResponse {
  _id: string;
  session: string;
  semester: string;
  level: string;
  score: number;
  grade: string;
  course: Course;
  user?: {
    name: string;
    email: string;
  };
}

interface SemesterResult {
  semester: string;
  gpa: string;
  courses: ResultResponse[];
}

interface MyResultsResponse {
  semesters: SemesterResult[];
  cgpa: string;
}

interface ResultState {
  results: ResultResponse[];
  myResults: MyResultsResponse | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: ResultState = {
  results: [],
  myResults: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// ---------- Thunks ----------

// Create a new result (Admin)
export const createResults = createAsyncThunk<
  ResultResponse,
  ResultData,
  { rejectValue: string }
>("result/createResults", async (resultData, thunkAPI) => {
  try {
    const token = (thunkAPI.getState() as any).auth.user.token;
    return await resultService.createResults(resultData, token);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get all results (Admin)
export const getAllResults = createAsyncThunk<
  ResultResponse[],
  void,
  { rejectValue: string }
>("result/getAllResults", async (_, thunkAPI) => {
  try {
    const token = (thunkAPI.getState() as any).auth.user.token;
    return await resultService.getAllResults(token);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get logged-in user's results (Student)
export const getMyResults = createAsyncThunk<
  MyResultsResponse,
  void,
  { rejectValue: string }
>("result/getMyResults", async (_, thunkAPI) => {
  try {
    const token = (thunkAPI.getState() as any).auth.user.token;
    return await resultService.getMyResults(token);
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// ---------- Slice ----------

const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Create results
      .addCase(createResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createResults.fulfilled, (state, action: PayloadAction<ResultResponse>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.results.push(action.payload);
      })
      .addCase(createResults.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to create result";
      })

      // Get all results
      .addCase(getAllResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllResults.fulfilled, (state, action: PayloadAction<ResultResponse[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.results = action.payload;
      })
      .addCase(getAllResults.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch results";
      })

      // Get my results
      .addCase(getMyResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyResults.fulfilled, (state, action: PayloadAction<MyResultsResponse>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myResults = action.payload;
      })
      .addCase(getMyResults.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch student results";
      });
  },
});

export const { reset } = resultSlice.actions;
export default resultSlice.reducer;
