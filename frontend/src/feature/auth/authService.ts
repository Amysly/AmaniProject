// authService.ts
import axios from 'axios';

const API_URL = '/api/users/';

export interface UserData {
  name?: string;
  email: string;
  password: string;
}

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

// Register user
const register = async (userData: UserData): Promise<UserResponse> => {
  try {
    const response = await axios.post<UserResponse>(API_URL, userData);

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error: any) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

// Login user
const login = async (userData: UserData): Promise<UserResponse> => {
  try {
    const response = await axios.post<UserResponse>(`${API_URL}login`, userData);

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

// Logout user
const logout = (): void => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
