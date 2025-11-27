import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { createDepartment } from "../../feature/departments/departmentSlice";

interface DepartmentForm {
  departmentName: string;
  totalCreditUnitPerSession: number;
  minCreditUnitPerSemester: number;
  maxCreditUnitPerSemester: number;
}

const Department: React.FC = () => {
  const [departmentForm, setDepartmentForm] = useState<DepartmentForm>({
    departmentName: "",
    totalCreditUnitPerSession: 0,
    minCreditUnitPerSemester: 0,
    maxCreditUnitPerSemester: 0,
  });

  const { departmentName, totalCreditUnitPerSession, 
    minCreditUnitPerSemester, maxCreditUnitPerSemester } = departmentForm;

  const dispatch = useAppDispatch();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      createDepartment({
        departmentName,
        totalCreditUnitPerSession,
        minCreditUnitPerSemester,
        maxCreditUnitPerSemester,
      })
    );

    // reset form
    setDepartmentForm({
      departmentName: "",
      totalCreditUnitPerSession: 0,
      minCreditUnitPerSemester: 0,
      maxCreditUnitPerSemester: 0,
    });
  };

  const handleDepartmentForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDepartmentForm((prev) => ({
      ...prev,
      [name]: name === "departmentName" ? value : Number(value), // keep numbers as numbers
    }));
  };

  return (
    <div className="mt-5 flex justify-center items-center bg-gray-100 p-8">
      <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-2xl">
        <h2 className="text-2xl text-center font-semibold mb-4 text-gray-700">
          Create Department
        </h2>
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <label className="block text-gray-600 mb-1">Department Name</label>
            <input
              type="text"
              name="departmentName"
              onChange={handleDepartmentForm}
              value={departmentName}
              placeholder="Enter department name"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-gray-600 mb-1 mt-3">
              Total Credit Units per Session
            </label>
            <input
              type="number"
              name="totalCreditUnitPerSession"
              onChange={handleDepartmentForm}
              value={totalCreditUnitPerSession}
              placeholder="Enter total credit units"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-gray-600 mb-1 mt-3">
              Min Credit Unit per Semester
            </label>
            <input
              type="number"
              name="minCreditUnitPerSemester"
              onChange={handleDepartmentForm}
              value={minCreditUnitPerSemester}
              placeholder="Enter Min CreditUnit per semester"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-gray-600 mb-1 mt-3">
              Max Credit Unit per Semester
            </label>
            <input
              type="number"
              name="maxCreditUnitPerSemester"
              onChange={handleDepartmentForm}
              value={maxCreditUnitPerSemester}
              placeholder="Enter Max CreditUnit per semester"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default Department;
