import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllRegisteredCourses } from "../../feature/courseRegitration/courseRegSlice";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StudentRegisteredCourses = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { CourseRegistration, isLoading, message, isError } = useAppSelector(
    (state) => state.coursereg
  );

  useEffect(() => {
    dispatch(getAllRegisteredCourses());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!CourseRegistration || Object.keys(CourseRegistration).length === 0) {
    return (
      <p className="text-center text-gray-600 mt-10">
        No registered courses available.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
        Your Registered Courses
      </h2>

      {Object.entries(CourseRegistration).map(([session, sessionData]) => (
        <div key={session} className="mb-10">
          <h3 className="text-xl font-semibold text-blue-700 mb-3">
            Session: {session}
          </h3>

          {Object.entries(sessionData.semesters).map(
            ([semester, semData]) => (
              <div key={semester} className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 mb-2">
                  {semester}
                </h4>

                {/* === COMPULSORY COURSES === */}
                <div className="overflow-x-auto mb-6">
                  <h5 className="text-md font-semibold text-blue-700 mb-2">
                    Compulsory Courses
                  </h5>
                  <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-blue-800 text-white font-semibold text-xl">
                      <tr>
                        <th className="border p-3 text-left">Course Title</th>
                        <th className="border p-3 text-left">Course Code</th>
                        <th className="border p-3 text-left">Course Unit</th>
                      </tr>
                    </thead>
                    <tbody className="text-lg font-semibold">
                      {semData.compulsoryCourses.map((course, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border p-3">{course.courseTitle}</td>
                          <td className="border p-3">{course.courseCode}</td>
                          <td className="border p-3 text-center">
                            {course.courseUnit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* === DEPARTMENT ELECTIVES === */}
                {semData.departmentElectives.length > 0 && (
                  <div className="overflow-x-auto mb-4">
                    <h5 className="text-md font-semibold text-green-700 mb-2">
                      Department Electives
                    </h5>
                    <table className="w-full border-collapse border border-gray-300">
                      <thead className="bg-green-700 text-white font-semibold text-xl">
                        <tr>
                          <th className="border p-3 text-left">Course Title</th>
                          <th className="border p-3 text-left">Course Code</th>
                          <th className="border p-3 text-left">Course Unit</th>
                        </tr>
                      </thead>
                      <tbody className="text-lg font-semibold">
                        {semData.departmentElectives.map((course, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="border p-3">{course.courseTitle}</td>
                            <td className="border p-3">{course.courseCode}</td>
                            <td className="border p-3 text-center">
                              {course.courseUnit}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* === OUTSIDE ELECTIVES === */}
                {semData.outsideElectives.length > 0 && (
                  <div className="overflow-x-auto mb-4">
                    <h5 className="text-md font-semibold text-purple-700 mb-2">
                      Outside Electives
                    </h5>
                    <table className="w-full border-collapse border border-gray-300">
                      <thead className="bg-purple-700 text-white font-semibold text-xl">
                        <tr>
                          <th className="border p-3 text-left">Course Title</th>
                          <th className="border p-3 text-left">Course Code</th>
                          <th className="border p-3 text-left">Course Unit</th>
                        </tr>
                      </thead>
                      <tbody className="text-lg font-semibold">
                        {semData.outsideElectives.map((course, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="border p-3">{course.courseTitle}</td>
                            <td className="border p-3">{course.courseCode}</td>
                            <td className="border p-3 text-center">
                              {course.courseUnit}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <p className="text-right font-semibold text-lg mt-2">
                  Total Semester Units: {semData.totalSemesterUnits}
                </p>
              </div>
            )
          )}

          <p className="text-right font-semibold text-lg mt-2">
            Total Session Units: {sessionData.totalSessionUnits}
          </p>
        </div>
      ))}
      
        <button onClick={()=> navigate ("/print-courseform")} className="bg-blue-600 rounded-md p-2 
        text-white text-xl">next</button>
    </div>
  );
};

export default StudentRegisteredCourses;
