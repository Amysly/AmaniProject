// ResultEntry.tsx
import React from "react";

const ResultsEntry: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Result Entry Form
        </h1>

        <form className="space-y-4">
          {/* Student Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Student Name
            </label>
            <input
              type="text"
              placeholder="Enter student's full name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Department
            </label>
            <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400">
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Biochemistry">Biochemistry</option>
              <option value="Business Admin">Business Admin</option>
              <option value="Mass Communication">Mass Communication</option>
            </select>
          </div>

          {/* Course */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Course
            </label>
            <input
              type="text"
              placeholder="Enter course name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          {/* Course Code */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Course Code
            </label>
            <input
              type="text"
              placeholder="Enter course code"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          {/* Score */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Score
            </label>
            <input
              type="number"
              placeholder="Enter student's score"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          {/* Grade */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Grade
            </label>
            <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400">
              <option value="">Select Grade</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="button"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Submit Result
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResultsEntry;
