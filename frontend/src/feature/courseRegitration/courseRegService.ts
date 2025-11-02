import axios from "axios";

const API_URLCOURSEREG = '/api/registercourse';

export interface CourseRegData {
    session:string;
    semester:string;
    gender: string;
    courses: string [];
}

export interface CourseRegResponse {
    _id: string;
    session:string;
    semester:string;
    gender: string;
    courses: string []; 
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

const courseRegService = {
    registerCourse
}

export default courseRegService