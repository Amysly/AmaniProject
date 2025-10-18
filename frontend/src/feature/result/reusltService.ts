import axios from "axios";
const API_URL = "/api/results";


// Course object from backend
interface Course {
  courseTitle: string;     
  courseCode: string;
  creditUnit: number;     
  department?: string;
}

// Result object returned from backend
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

// Data sent to backend (same structure, except _id not required)
export interface ResultData {
  session: string;
  semester: string;
  level: string;
  score: number;
  grade?: string;
  course: string; // sending courseId instead of full course object
}

// For `getMyResults` response
interface SemesterResult {
  semester: string;
  gpa: string;
  courses: ResultResponse[];
}

export interface MyResultsResponse {
  semesters: SemesterResult[];
  cgpa: string;
}



// Create a result (admin only)
const createResults = async (
  resultData: ResultData,
  token: string
): Promise<ResultResponse> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post<ResultResponse>(`${API_URL}`, resultData, config);
  return response.data;
};

// Fetch all results (admin)
const getAllResults = async (token: string): Promise<ResultResponse[]> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get<ResultResponse[]>(`${API_URL}`, config);
  return response.data;
};

// Fetch logged-in user’s results
const getMyResults = async (token: string): Promise<MyResultsResponse> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get<MyResultsResponse>(`${API_URL}/my`, config);
  return response.data;
};

const resultService = {
  createResults,
  getAllResults,
  getMyResults,
};

export default resultService;
