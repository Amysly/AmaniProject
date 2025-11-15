import axios from "axios";

const API_URLCOURSEREG = '/api/registercourse';

export interface CourseRegData {
    session:string;
    semester:string;
    gender: string;
    courses: string [];
departmentElectives: string[];
  outsideElectives: string[];
}

export interface CourseRegResponse {
    _id: string;
    session:string;
    semester:string;
    gender: string;
    courses: string []; 
departmentElectives: string[];
  outsideElectives: string[];
}

const registerCourse = async (
    courseDataReg: CourseRegData,
    token: string
): Promise<CourseRegResponse> => {
    const config = {
        headers:{
            authorization: `Bearer ${token}`
        },
    };

    const response = await axios.post<CourseRegResponse>(API_URLCOURSEREG, courseDataReg,config)
    return response.data
}

const getAllRegisteredCourses = async (token:string):Promise<CourseRegResponse>=>{
    const config ={
        headers:{
            authorization: `Bearer ${token}`
        },
    };
    const response = await axios.get<CourseRegResponse>(API_URLCOURSEREG, config)
    return response.data
}

const courseRegService = {
    registerCourse,
    getAllRegisteredCourses
}

export default courseRegService