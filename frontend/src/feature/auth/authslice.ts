import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import authService from './authService';

export interface User {
  _id: string;   // match MongoDB’s field
  name: string;
  email: string;
  role: string;
 profileImage: string;
 level:string;
  matriNumber:string;
 department: string;
  token?: string;
}

interface UserResponse {
  _id: string;
  name: string;
  email: string;
  level:string;
 department: string;
 matriNumber:string;
  profileImage: string;
  token: string;
}

 interface Course {
  courseTitle: string;
  courseCode: string;
  creditUnit: number;
}

 interface Result {
  _id: string;
  session: string;
  semester: string;
  level: number;
  score: number;
  grade: string;
  courses: Course;
}

 interface Department {
  _id: string;
  departmentName: string;
}

interface StudentData {
  _id: string;
 user: User;
  department: Department;
  results: Result[];
}



 interface UpdateUserPayload {
  _id: string;
  updatedData: { name?: string; email?: string ; role?:string;};
}

interface AuthState {
  user: User | null;
  studentData: StudentData | null;
  users: User[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const user = localStorage.getItem('user')
  ? (JSON.parse(localStorage.getItem('user') as string) as User)
  : null;

const initialState: AuthState = {
  user: user ? user : null,
  studentData:  null,
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

type RegisterUser = {
  name: string;
  email: string;
  password: string;
};

export const register = createAsyncThunk<User, RegisterUser, { rejectValue: string }>(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'auth/getusers',
  async (_, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as any).auth.user?.token;
      return await authService.getUsers(token);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get user by id
export const getUserById = createAsyncThunk<
  StudentData, 
  string, 
  { rejectValue: string }
>(
  "auth/getUserById",
  async (id, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as any).auth.user?.token;
      return await authService.getUserById(id, token);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//update user
export const updateUser = createAsyncThunk<
  UserResponse,
  UpdateUserPayload,
  { rejectValue: string }
>(
  'auth/updateUser',
  async (payload, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as any).auth.user?.token;
      return await authService.updateUser(payload, token);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete user thunk (returns { id, message })
export const deleteUser = createAsyncThunk<
  { id: string; message: string },
  string,
  { rejectValue: string }
>(
  'auth/deleteUser',
  async (id, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as any).auth.user?.token;
      return await authService.deleteUser(id, token);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const uploadProfileImage = createAsyncThunk(
  "auth/uploadProfileImage",
  async (file: File, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as any).auth.user.token;
      return await authService.uploadProfileImage(file, token);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

type LoginUser = {
  email: string;
  password: string;
};

export const login = createAsyncThunk<User, LoginUser, { rejectValue: string }>(
  'auth/login',
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      //get
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.users = [];
      })
      //getuser by id
       .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action: PayloadAction<StudentData>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.studentData = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.studentData = null;
      })

      //update
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
     .addCase(updateUser.fulfilled, (state, action: PayloadAction<UserResponse>) => {
        state.isLoading = false;
        state.isSuccess = true;

        const index = state.users.findIndex((u) => u._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload; // updated user replaces old one
        }
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = state.users.filter((user) => user._id !== action.payload.id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      //upload image
     .addCase(uploadProfileImage.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(uploadProfileImage.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload; // whole user, not just profileImage
    })
    .addCase(uploadProfileImage.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
