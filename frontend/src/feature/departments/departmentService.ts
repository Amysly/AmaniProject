import axios from "axios";

const API_URL = "/api/admin/departments";

// what you send TO the backend
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

// create department
const createDepartment = async (
  departmentData: DepartmentData,
  token: string
): Promise<DepartmentResponse> => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post<DepartmentResponse>(
    API_URL,
    departmentData,
    config
  );
  return response.data;
};

// get all departments
const getDepartments = async (
  token: string
): Promise<DepartmentResponse[]> => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get<DepartmentResponse[]>(API_URL, config);
  return response.data;
};

const departmentservice = {
  createDepartment,
  getDepartments,
};

export default departmentservice;
