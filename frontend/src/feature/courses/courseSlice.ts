import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the state type
interface AuthState {
  course: string[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

// Initial state with type
const initialState: AuthState = {
  course: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Slice
export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    reset: () => initialState,
  },
});

export const { reset } = courseSlice.actions;
export default courseSlice.reducer;
