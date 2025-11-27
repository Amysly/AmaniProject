import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments, reset } from "../../feature/departments/departmentSlice";
import type { AppDispatch, RootState } from "../../app/store";
import { FaEdit, FaTrash} from "react-icons/fa";

interface Department {
  _id: string;
  departmentName: string;
  totalCreditUnitPerSession: number;
  minCreditUnitPerSemester: number;
  maxCreditUnitPerSemester: number;
}

const ViewDepartments: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { departments, isLoading, isError, message } = useSelector(
    (state: RootState) => state.departments
  );

  // Fetch departments on mount
  useEffect(() => {
    dispatch(getDepartments());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  // Show error messages if error state changes
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="overflow-x-auto mt-4">
      <h1 className="mb-5 text-center text-4xl">All Departments</h1>
      <table className="min-w-full border border-slate-300">
        <thead className="bg-slate-100">
          <tr>
            <th className="border px-4 py-2 text-left">Department Name</th>
            <th className="border px-4 py-2 text-left">Total CU / Session</th>
            <th className="border px-4 py-2 text-left">Min CU / Semester</th>
            <th className="border px-4 py-2 text-left">Max CU / Semester</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.length > 0 ? (
            departments.map((dept: Department) => (
              <tr key={dept._id}>
                <td className="border px-4 py-2">{dept.departmentName}</td>
                <td className="border px-4 py-2">{dept.totalCreditUnitPerSession}</td>
                <td className="border px-4 py-2">{dept.minCreditUnitPerSemester}</td>
                <td className="border px-4 py-2">{dept.maxCreditUnitPerSemester}</td>
                 <td className="p-3 space-x-2 flex justify-center">
                 <button className="flex items-center gap-1 bg-blue-700 text-white px-3 py-1 
                 rounded hover:bg-blue-800">
                    <FaEdit />
                  </button>
                   <button
                     
                     className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 
                     rounded hover:bg-red-700"
                                  >
                     <FaTrash /> 
                     </button>
                  </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center text-sm text-slate-500 py-2">
                No departments to show.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewDepartments;
