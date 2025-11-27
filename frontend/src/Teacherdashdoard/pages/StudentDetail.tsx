import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUserById } from "../../feature/auth/authslice";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

const StudentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { studentData, isLoading, isError, message } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (id) dispatch(getUserById(id));
  }, [id, dispatch]);

  useEffect(() => {
  if (studentData) console.log("Fetched Student Data:", studentData);
}, [studentData]);

   useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message]);

 if (isLoading) return <Spinner />;
  if (!studentData) return <p className="text-center mt-10">No student found.</p>;

  const { user, department, results } = studentData;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Student Details</h2>

      {/* Profile section */}
      <div className="flex items-center gap-5 mb-6">
        <img
          src={user?.profileImage || "/default-profile.png"}
          alt={user?.name || "Student"}
          className="w-32 h-32 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-medium">{user?.name}</p>
          <p className="text-gray-600">{user?.email}</p>
           <p className="text-gray-600">{user?.role}</p>
          <p className="text-gray-600">Department: {department?.departmentName}</p>
        </div>
      </div>

      {/* Results */}
      <h3 className="text-xl font-semibold mb-3">Results</h3>
      {results?.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border p-2">Session</th>
              <th className="border p-2">Semester</th>
              <th className="border p-2">Level</th>
              <th className="border p-2">Course</th>
              <th className="border p-2">Score</th>
              <th className="border p-2">Grade</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result._id} className="hover:bg-gray-50">
                <td className="border p-2">{result.session}</td>
                <td className="border p-2">{result.semester}</td>
                <td className="border p-2">{result.level}</td>
                <td className="border p-2">
                  {result.courses?.courseTitle || "N/A"} ({result.courses?.courseCode})
                </td>
                <td className="border p-2">{result.score}</td>
                <td className="border p-2">{result.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results found for this student.</p>
      )}
    </div>
  );
};

export default StudentDetail;
