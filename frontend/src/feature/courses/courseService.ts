import axios from "axios";

const API_URLCOURSE = "/api/admin/courses";

// data you send to backend
export interface CourseData {
  courseTitle: string;
  courseCode: string;
  courseUnit: number;
  department: string; 
}

// data you receive from backend
export interface CourseResponse {
  _id: string;
  courseTitle: string;
  courseCode: string;
  courseUnit: number;
  department: string;
}

interface UpdateCoursePayload {
  _id: string;
   updatedData: {  courseTitle?: string;  courseCode?: string; 
  courseUnit?:number ; department?: string;};
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

  const response = await axios.post<CourseResponse>(API_URLCOURSE, courseData, config);
  return response.data;
};

// get all courses
const getCourses = async (token: string): Promise<CourseResponse[]> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get<CourseResponse[]>(API_URLCOURSE, config);
  return response.data;
};

//update course
const updateCourse = async (
  payload: UpdateCoursePayload,
  token: string
): Promise<CourseResponse> => {
  const { _id, updatedData } = payload;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put<CourseResponse>(
    `${API_URLCOURSE}/${_id}`,
    updatedData, 
    config
  );

  return response.data;
};

//delete course
const deleteCourse = async(
_id:string,
token:string
):Promise<{id:string; message: string}> =>{
  const config = {
    headers:{Authorization: `Bearer ${token}`}
  }
  const response = await axios.delete<{id:string; message: string}>(
    `${API_URLCOURSE}/${_id}`,
    config
  );
  return response.data;
}

const courseService = {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
};

export default courseService;
