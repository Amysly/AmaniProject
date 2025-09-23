// authService.ts
import axios from 'axios';

const API_URL = '/api/users/';
const adminAPI_URL = '/api/admin/users';


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

interface UpdateUserPayload {
  _id: string;
  updatedData: { name?: string; email?: string };
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

//get users
const getUsers = async (token: string): Promise<UserResponse[]> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get<UserResponse[]>(adminAPI_URL, config);
  return response.data;
}

//update user
const updateUser = async (
  payload: UpdateUserPayload,
  token: string
): Promise<UserResponse> => {
  const { _id, updatedData } = payload;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put<UserResponse>(
    `${adminAPI_URL}/${_id}`,
    updatedData, // send only name/email
    config
  );

  return response.data;
};


//delete user
const deleteUser = async (
  _id: string,
  token: string
): Promise<{ id: string; message: string }> => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete<{ id: string; message: string }>(
    `${adminAPI_URL}/${_id}`,
    config
  );
  return response.data;
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
  getUsers,
  updateUser,
  deleteUser
};

export default authService;
