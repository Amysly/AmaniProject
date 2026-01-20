import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import assignmentService from "./assignmentService";


export interface AssignmentData {
  assignmentQuestion: string;
  submissionDeadline: string;
  level: string;
  coursesId: string;
}

export interface AssignmentResponse {
  _id: string;
  assignmentQuestion: string;
  submissionDeadline: string;
  level: string;
  coursesId: string;
}

interface UpdateAssignmentPayload {
  _id: string;
  updatedData: {
    assignmentQuestion?: string;
    submissionDeadline?: string;
    level?: string;
    department?: string;
    coursesId?: string;
  };
}

interface AssignmentState {
  assignment: AssignmentResponse[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

// ---------- INITIAL STATE ----------
const initialState: AssignmentState = {
  assignment: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// ---------- GET ASSIGNMENTS (Lecturer) ----------
export const getAssignments = createAsyncThunk<
  AssignmentResponse[],
  string, // courseId
  { rejectValue: string }
>("assignment/getAssignments", async (courseId, thunkAPI) => {
  try {
    const token = (thunkAPI.getState() as any).auth.user.token;
    return await assignmentService.getAssignments(courseId, token);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Error loading assignments"
    );
  }
});

// ---------- CREATE ASSIGNMENT ----------
export const createAssignment = createAsyncThunk<
  AssignmentResponse,
  AssignmentData,
  { rejectValue: string }
>("assignment/create", async (data, thunkAPI) => {
  try {
    const token = (thunkAPI.getState() as any).auth.user.token;
    return await assignmentService.createAssignment(data, token);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Error creating assignment"
    );
  }
});

// ---------- UPDATE ASSIGNMENT ----------
export const updateAssignment = createAsyncThunk<
  AssignmentResponse,
  UpdateAssignmentPayload,
  { rejectValue: string }
>("assignment/update", async (payload, thunkAPI) => {
  try {
    const token = (thunkAPI.getState() as any).auth.user.token;
    return await assignmentService.updateAssignment(payload, token);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Error updating assignment"
    );
  }
});

// ---------- DELETE ASSIGNMENT ----------
export const deleteAssignment = createAsyncThunk<
  { id: string; message: string },
  string,
  { rejectValue: string }
>("assignment/delete", async (id, thunkAPI) => {
  try {
    const token = (thunkAPI.getState() as any).auth.user.token;
    return await assignmentService.deleteAssignment(id, token);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Error deleting assignment"
    );
  }
});

// ---------- SLICE ----------
export const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get Assignments
      .addCase(getAssignments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAssignments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.assignment = action.payload;
      })
      .addCase(getAssignments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "";
      })

      // Create Assignment
      .addCase(createAssignment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAssignment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.assignment.push(action.payload);
      })
      .addCase(createAssignment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "";
      })

      // Update Assignment
      .addCase(updateAssignment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAssignment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        const index = state.assignment.findIndex(
          (item) => item._id === action.payload._id
        );

        if (index !== -1) {
          state.assignment[index] = action.payload;
        }
      })
      .addCase(updateAssignment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "";
      })

      // Delete Assignment
      .addCase(deleteAssignment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAssignment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.assignment = state.assignment.filter(
          (a) => a._id !== action.payload.id
        );
      })
      .addCase(deleteAssignment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "";
      });
  },
});

export const { reset } = assignmentSlice.actions;
export default assignmentSlice.reducer;
