import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import authService from './authService';

export interface User {
  _id: string;   // match MongoDB’s field
  name: string;
  email: string;
  token?: string;
}

interface UserResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}


 interface UpdateUserPayload {
  _id: string;
  updatedData: { name?: string; email?: string };
}

interface AuthState {
  user: User | null;
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

      //  fixed deleteUser reducer
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
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
