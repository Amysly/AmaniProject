import React from "react";

const RolesForm:React.FC = () => {
return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
           Assign Roles
        </h1>

        <form className="space-y-4">
          {/* Student Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Student Name
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          {/* Roles */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Roles
            </label>
            <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400">
              <option value="">Admin</option>
              <option value="Computer Science">Teacher</option>
              <option value="Biochemistry">Students</option>
            </select>
          </div>
          {/* Submit */}
          <div className="text-center">
            <button
              type="button"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RolesForm;
