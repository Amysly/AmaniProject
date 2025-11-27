import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllResults } from "../../feature/result/resultSlice";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

const ViewResults: React.FC = () => {
  const dispatch = useAppDispatch();
  const { results, isLoading, isError, message } = useAppSelector(
    (state) => state.result
  );

  useEffect(() => {
    dispatch(getAllResults());
  }, [dispatch]);

  useEffect(() => {
    if (results) console.log("Fetched user results:", results);
  }, [results]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        All Student Results
      </h2>

      {results && results.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">Student Name</th>
                <th className="border p-3 text-left">Department</th>
                <th className="border p-3 text-left">Level</th>
                <th className="border p-3 text-left">Semester</th>
                <th className="border p-3 text-left">Courses</th>
                <th className="border p-3 text-left">Score</th>
                <th className="border p-3 text-left">Grade</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result: any) => (
                <tr key={result._id} className="hover:bg-gray-50">
                  <td className="border p-3">{result.user?.name || "none"}</td>
                  <td className="border p-3">
                    {result.department?.departmentName || "none"}
                  </td>
                  <td className="border p-3">{result.level}</td>
                  <td className="border p-3">{result.semester}</td>
                  <td className="border p-3">
                    {result.courses && result.courses.length > 0 ? (
                      <ul className="list-disc pl-4">
                        {result.courses.map((course: any, idx: number) => (
                          <li key={idx}>
                            {course.courseTitle} ({course.courseCode})
                            {course.creditUnit}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "No Courses"
                    )}
                  </td>
                  <td className="border p-3 text-center">{result.score}</td>
                  <td className="border p-3 text-center font-semibold">
                    {result.grade}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">
          No results available.
        </p>
      )}
    </div>
  );
};

export default ViewResults;
