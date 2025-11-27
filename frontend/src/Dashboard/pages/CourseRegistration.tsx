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
  outsideElectives: string[];
  departmentElectives: string[];
  gender: string;
}

const CourseRegistration: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const {
    studentsCourses,
    departmentElectives,
    outsideElectives,
  } = useAppSelector((state) => state.courses);

  const {
    isError,
    isLoading,
    isSuccess,
    message,
  } = useAppSelector((state) => state.coursereg);

  const [courseReg, setCourseReg] = useState<CourseRegForm>({
    session: "",
    semester: "",
    courses: [],
    departmentElectives: [],
    outsideElectives: [],
    gender: "",
  });

  // Handle input
  const handleChangeRegForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCourseReg((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Core courses handler
  const handleCourseCheckboxChange = (courseId: string) => {
    setCourseReg((prev) => {
      const isSelected = prev.courses.includes(courseId);
      return {
        ...prev,
        courses: isSelected
          ? prev.courses.filter((id) => id !== courseId)
          : [...prev.courses, courseId],
      };
    });
  };

  // Department electives handler
  const handleElectiveCheckboxChange = (electiveId: string) => {
    setCourseReg((prev) => {
      const isSelected = prev.departmentElectives.includes(electiveId);
      return {
        ...prev,
        departmentElectives: isSelected
          ? prev.departmentElectives.filter((id) => id !== electiveId)
          : [...prev.departmentElectives, electiveId],
      };
    });
  };

  // Outside electives handler
  const handleOutsideElectiveCheckboxChange = (electiveId: string) => {
    setCourseReg((prev) => {
      const isSelected = prev.outsideElectives.includes(electiveId);
      return {
        ...prev,
        outsideElectives: isSelected
          ? prev.outsideElectives.filter((id) => id !== electiveId)
          : [...prev.outsideElectives, electiveId],
      };
    });
  };

  // Submit form
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

  // Fetch courses
  useEffect(() => {
    if (user && user.department) {
      dispatch(getCoursesByStudents(user.department));
    }
  }, [dispatch, user]);

  // Toast notifications
  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess) {
      toast.success("Course registered successfully");
      setCourseReg({
        session: "",
        semester: "",
        courses: [],
        departmentElectives: [],
        outsideElectives: [],
        gender: "",
      });
      dispatch(reset());
    }
  }, [isError, isSuccess, message, dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmitRegForm}
        className="bg-white w-full max-w-5xl p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Course Registration
        </h2>

        {/* TWO COLUMN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT COLUMN */}
          <div className="space-y-6">

            {/* SESSION */}
            <div>
              <label className="font-medium text-gray-700">Session</label>
              <input
                type="text"
                name="session"
                placeholder="2024/2025"
                value={courseReg.session}
                onChange={handleChangeRegForm}
                className="w-full px-3 py-2 border rounded-lg mt-1"
                required
              />
            </div>

            {/* SEMESTER */}
            <div>
              <label className="font-medium text-gray-700">Semester</label>
              <input
                type="text"
                name="semester"
                placeholder="First Semester"
                value={courseReg.semester}
                onChange={handleChangeRegForm}
                className="w-full px-3 py-2 border rounded-lg mt-1"
                required
              />
            </div>

            {/* GENDER */}
            <div>
              <label className="font-medium text-gray-700">Gender</label>
              <div className="flex items-center space-x-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={courseReg.gender === "Male"}
                    onChange={handleChangeRegForm}
                    className="accent-blue-600"
                    required
                  />
                  <span className="ml-2">Male</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={courseReg.gender === "Female"}
                    onChange={handleChangeRegForm}
                    className="accent-pink-600"
                    required
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">

            {/* CORE COURSES */}
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Core Courses
              </h3>

              <div className="max-h-40 overflow-y-auto border rounded-lg p-3 bg-gray-50">
                {studentsCourses.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center">
                    No core courses available
                  </p>
                ) : (
                  studentsCourses.map((course) => (
                    <label key={course._id} className="flex items-center py-1">
                      <input
                        type="checkbox"
                        checked={courseReg.courses.includes(course._id)}
                        onChange={() =>
                          handleCourseCheckboxChange(course._id)
                        }
                        className="accent-green-600"
                      />
                      <span className="ml-2 text-gray-700">
                        {course.courseTitle} ({course.courseCode})
                      </span>
                    </label>
                  ))
                )}
              </div>
            </div>

            {/* DEPARTMENT ELECTIVES */}
  <div>
  {departmentElectives.length > 0 && (
    <div>
      <h3 className="font-semibold text-lg text-gray-800 mb-2">
        Department Electives
      </h3>

      <div className="max-h-40 overflow-y-auto border rounded-lg p-3 bg-gray-50">
        {departmentElectives.map((elective) => (
          <label key={elective._id} className="flex items-center py-1">
            <input
              type="checkbox"
              checked={courseReg.departmentElectives.includes(elective._id)}
              onChange={() =>
                handleElectiveCheckboxChange(elective._id)
              }
              className="accent-blue-600"
            />
            <span className="ml-2 text-gray-700">
              {elective.courseTitle} ({elective.courseCode})
            </span>
          </label>
        ))}
      </div>
    </div>
  )}
</div>


            {/* OUTSIDE ELECTIVES */}
            <div>
              {outsideElectives.length > 0 && (
                <div className="max-h-40 overflow-y-auto border rounded-lg p-3 bg-gray-50">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">
                    Outside Electives
                  </h3>

                  {outsideElectives.map((elective) => (
                    <label key={elective._id} className="flex items-center py-1">
                      <input
                        type="checkbox"
                        checked={courseReg.outsideElectives.includes(elective._id)}
                        onChange={() =>
                          handleOutsideElectiveCheckboxChange(elective._id)
                        }
                        className="accent-purple-600"
                      />
                      <span className="ml-2 text-gray-700">
                        {elective.courseTitle} ({elective.courseCode})
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Register Course
        </button>
      </form>
    </div>
  );
};

export default CourseRegistration;
