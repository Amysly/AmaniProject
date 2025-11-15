import axios from "axios";

const API_URLCOURSE = "/api/admin/courses";
const API_URLCOURSESTUDENTS = "/api/student/courses";

// data you send to backend
export interface CourseData {
  courseTitle: string;
  courseCode: string;
  courseUnit: number;
  courseLevel: string;
  isElective: boolean;
  isOutsideElective: boolean;
  allowedDepartments: string;
  department: string; 
}

// data you receive from backend
export interface CourseResponse {
  _id: string;
  courseTitle: string;
  courseCode: string;
  courseUnit: number;
  courseLevel:string;
  isElective: boolean;
  isOutsideElective: boolean;
  allowedDepartments: string;
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

// get all courses filtered by department
const getCoursesByStudents = async (
  token: string,
  departmentId?: string
): Promise<{
  courses: CourseResponse[];
  departmentElectives: CourseResponse[];
  outsideElectives: CourseResponse[];
}> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const url = departmentId
    ? `${API_URLCOURSESTUDENTS}?department=${departmentId}`
    : API_URLCOURSESTUDENTS;

  const response = await axios.get<{
    allCourses: CourseResponse[];
    deptElective: CourseResponse[];
    outsideElectives: CourseResponse[];
  }>(url, config);

  // map backend keys to frontend expected keys
  return {
    courses: response.data.allCourses || [],
    departmentElectives: response.data.deptElective || [],
    outsideElectives: response.data.outsideElectives || [],
  };
};


// get all courses by Admin
const getCoursesByAdmin = async (
  token: string,
): Promise<CourseResponse[]> => {
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
  getCoursesByStudents,
  updateCourse,
  deleteCourse,
  getCoursesByAdmin
};

export default courseService;
