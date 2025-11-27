import React,{useRef,useEffect} from 'react'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllRegisteredCourses } from '../../feature/courseRegitration/courseRegSlice';

const PrintCourseForm:React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContents = printRef.current?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  const dispatch = useAppDispatch();
  const { CourseRegistration } = useAppSelector((state) => state.coursereg);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllRegisteredCourses());
  }, [dispatch]);

  if (!CourseRegistration || Object.keys(CourseRegistration).length === 0) {
    return (
      <p className="text-center text-gray-600 mt-10">
        No registered courses available.
      </p>
    );
  }

  return (
    <div> {/* <--- outer wrapper FIXED */}
      <div className="p-6">
        {/* Printable area */}
        <div ref={printRef} className="bg-white p-8 shadow-md">

          {/* School Header */}
          <div className="text-center border-b pb-4">
            <h1 className="text-2xl font-bold">HILL STONE COLLEGE OF EDUCATION</h1>
            <h2 className="text-lg font-semibold">Course Registration Form</h2>
          </div>

          {/* Student Info */}
          <div className="mt-3 mb-3 grid grid-cols-2 gap-6 text-lg">
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Matric No:</strong> {user?.matriNumber}</p>
            <p><strong>Department:</strong> {user?.department?.departmentName}</p>
            <p><strong>Level:</strong> {user?.level}</p>
          </div>

          {/* Sessions */}
          {Object.entries(CourseRegistration).map(([session, sessionData]) => (
            <div key={session} className="mb-10">
              <h3 className="text-xl font-semibold mb-3">
                Session: {session}
              </h3>

              {Object.entries(sessionData.semesters).map(([semester, semData]) => (
                <div key={semester} className="mb-6">
                  <h4 className="text-lg font-medium  mb-2">
                    {semester}
                  </h4>

                  {/* Compulsory */}
                  <div className="overflow-x-auto mb-6">
                    <h5 className="text-md  text-center text-xl font-semibold mb-4">
                      Compulsory Courses
                    </h5>
                    <table className="w-full border-collapse border border-gray-300">
                      <thead className="bg-blue-800 text-white font-semibold text-xl">
                        <tr>
                          <th className="border p-3">Course Title</th>
                          <th className="border p-3">Course Code</th>
                          <th className="border p-3">Course Unit</th>
                        </tr>
                      </thead>
                      <tbody className="text-lg font-semibold">
                        {semData.compulsoryCourses.map((course, index) => (
                          <tr key={index}>
                            <td className="border p-3">{course.courseTitle}</td>
                            <td className="border p-3">{course.courseCode}</td>
                            <td className="border p-3 text-center">{course.courseUnit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Department Electives */}
                  {semData.departmentElectives.length > 0 && (
                    <div className="overflow-x-auto mb-4">
                      <h5 className="text-md font-semibold text-green-700 mb-2">
                        Department Electives
                      </h5>
                      <table className="w-full border-collapse border">
                        <thead className="bg-green-700 text-white text-xl">
                          <tr>
                            <th className="border p-3">Course Title</th>
                            <th className="border p-3">Course Code</th>
                            <th className="border p-3">Course Unit</th>
                          </tr>
                        </thead>
                        <tbody className="text-lg font-semibold">
                          {semData.departmentElectives.map((course, index) => (
                            <tr key={index}>
                              <td className="border p-3">{course.courseTitle}</td>
                              <td className="border p-3">{course.courseCode}</td>
                              <td className="border p-3 text-center">{course.courseUnit}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Outside Electives */}
                  {semData.outsideElectives.length > 0 && (
                    <div className="overflow-x-auto mb-4">
                      <h5 className="text-md font-semibold text-purple-700 mb-2">
                        Outside Electives
                      </h5>
                      <table className="w-full border-collapse border">
                        <thead className="bg-purple-700 text-white text-xl">
                          <tr>
                            <th className="border p-3">Course Title</th>
                            <th className="border p-3">Course Code</th>
                            <th className="border p-3">Course Unit</th>
                          </tr>
                        </thead>
                        <tbody className="text-lg font-semibold">
                          {semData.outsideElectives.map((course, index) => (
                            <tr key={index}>
                              <td className="border p-3">{course.courseTitle}</td>
                              <td className="border p-3">{course.courseCode}</td>
                              <td className="border p-3 text-center">{course.courseUnit}</td>
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
              ))}
            </div>
          ))}
             {/* Signature Section */}
          <div className="mt-10 grid grid-cols-2 gap-10">
          <div>
            <p className="border-t w-48 pt-2 text-sm">Student Signature</p>
          </div>
          <div>
            <p className="border-t w-48 pt-2 text-sm">HOD Signature</p>
          </div>
        </div>
        </div> 
      </div> 
      {/* Print button */}
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded-md mb-6"
        >
          Print Course Form
        </button>
    </div> 
  );
};

export default PrintCourseForm;
