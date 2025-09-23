import axios from "axios";

const API_URL = "/api/courses/";

// data you send to backend
export interface CourseData {
  courseTitle: string;
  courseCode: string;
  courseUnit: number;
  department: string; 
}

// data you receive from backend
export interface CourseResponse {
  id: string;
  courseTitle: string;
  courseCode: string;
  courseUnit: number;
  department: string;
  createdAt: string;
  updatedAt: string;
}

// create course
const createCourse = async (
  courseData: CourseData,
  token: string
): Promise<CourseResponse> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post<CourseResponse>(API_URL, courseData, config);
  return response.data;
};

// get all courses
const getCourses = async (token: string): Promise<CourseResponse[]> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get<CourseResponse[]>(API_URL, config);
  return response.data;
};

const courseService = {
  createCourse,
  getCourses,
};

export default courseService;
