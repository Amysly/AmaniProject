import React from "react";

const PermissionsTable: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Permissions</h1>

      {/* Roles Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Manage Roles</h2>
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="text-left py-3 px-4">Role</th>
              <th className="text-left py-3 px-4">Description</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3 px-4">Admin</td>
              <td className="py-3 px-4">Full access to all resources</td>
              <td className="py-3 px-4">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4">Editor</td>
              <td className="py-3 px-4">Can edit and manage content</td>
              <td className="py-3 px-4">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4">Viewer</td>
              <td className="py-3 px-4">Read-only access</td>
              <td className="py-3 px-4">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            + Add Role
          </button>
        </div>
      </div>

      {/* Permissions Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Manage Permissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg flex items-center justify-between">
            <span className="text-gray-700">Access Dashboard</span>
            <input type="checkbox" className="w-5 h-5" />
          </div>
          <div className="p-4 border rounded-lg flex items-center justify-between">
            <span className="text-gray-700">Manage Users</span>
            <input type="checkbox" className="w-5 h-5" />
          </div>
          <div className="p-4 border rounded-lg flex items-center justify-between">
            <span className="text-gray-700">Create Courses</span>
            <input type="checkbox" className="w-5 h-5" />
          </div>
          <div className="p-4 border rounded-lg flex items-center justify-between">
            <span className="text-gray-700">Edit Departments</span>
            <input type="checkbox" className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            Save Permissions
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionsTable;
