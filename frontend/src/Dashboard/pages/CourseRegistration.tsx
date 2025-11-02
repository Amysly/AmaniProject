import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { registerCourse, reset } from "../../feature/courseRegitration/courseRegSlice";
import { getCoursesByStudents } from "../../feature/courses/courseSlice";

interface CourseRegForm {
  session: string;
  semester: string;
  courses: string[];
  gender: string;
}

const CourseRegistration: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { studentsCourses } = useAppSelector((state) => state.courses);
  const { isError, isLoading, isSuccess, message } = useAppSelector(
    (state) => state.coursereg
  );

  const [courseReg, setCourseReg] = useState<CourseRegForm>({
    session: "",
    semester: "",
    courses: [],
    gender: "",
  });

  const handleSubmitRegForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !courseReg.courses.length ||
      !courseReg.session ||
      !courseReg.semester ||
      !courseReg.gender
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    dispatch(registerCourse(courseReg));
  };

  const handleChangeRegForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCourseReg((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //  Handle checkbox changes
  const handleCourseCheckboxChange = (courseId: string) => {
    setCourseReg((prev) => {
      const isSelected = prev.courses.includes(courseId);
      return {
        ...prev,
        courses: isSelected
          ? prev.courses.filter((id) => id !== courseId) // remove if already selected
          : [...prev.courses, courseId], // add if newly selected
      };
    });
  };

  useEffect(() => {
    if (user && user.department) {
      dispatch(getCoursesByStudents(user.department));
      //Only fetch courses that belong to this department
    }
  }, [dispatch, user]);

  useEffect(()=>{
    if (studentsCourses ) {
      console.log("Fetched Student courses:", studentsCourses)
    }
  }, [studentsCourses])

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (isSuccess) {
      toast.success("Course registered successfully");
      setCourseReg({
        session: "",
        semester: "",
        courses: [],
        gender: "",
      });
      dispatch(reset());
    }
  }, [isError, isSuccess, message, dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmitRegForm}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Course Registration
        </h2>

        <input
          type="text"
          name="session"
          placeholder="Session (e.g. 2024/2025)"
          value={courseReg.session}
          onChange={handleChangeRegForm}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />

        <input
          type="text"
          name="semester"
          placeholder="Semester (e.g. First Semester)"
          value={courseReg.semester}
          onChange={handleChangeRegForm}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />

        {/* GENDER SELECTION */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1">Gender</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={courseReg.gender === "Male"}
                onChange={handleChangeRegForm}
                className="accent-blue-600"
                required
              />
              <span>Male</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={courseReg.gender === "Female"}
                onChange={handleChangeRegForm}
                className="accent-pink-600"
                required
              />
              <span>Female</span>
            </label>
          </div>
        </div>

        {/* CHECKBOX COURSE LIST */}
        <div>
          <label className="font-medium text-gray-700 mb-1">Select Courses</label>
          <div className="max-h-48 overflow-y-auto border rounded-lg p-2">
            {studentsCourses.length === 0 ? (
              <p className="text-gray-500 text-sm text-center">No courses available</p>
            ) : (
              studentsCourses.map((course) => (
                <label
                  key={course._id}
                  className="flex items-center space-x-2 py-1 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={course._id}
                    checked={courseReg.courses.includes(course._id)}
                    onChange={() => handleCourseCheckboxChange(course._id)}
                    className="accent-green-600"
                  />
                  <span className="text-gray-700">
                    {course.courseTitle} ({course.courseCode})
                  </span>
                </label>
              ))
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Register Course
        </button>
      </form>
    </div>
  );
};

export default CourseRegistration;
