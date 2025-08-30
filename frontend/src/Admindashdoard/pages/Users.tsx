import React, { useState } from "react";
import { FaEdit, FaTrash, FaExclamationCircle, FaTimes } from "react-icons/fa";
import tableDatas from "./tableData";
import AddUser from "./AddUser";



const Users: React.FC = () => {
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);

  const handleClickRemoveUser = () => {
    setShowRemoveModal(true);
  };

  const handleCancelRemove = () => {
    setShowRemoveModal(false);
  };

  const handleConfirmRemove = () => {
    alert("user removed");
    setShowRemoveModal(false);
  };

  const handleAddUserForm = () => {
    setShowAddUserModal(!showAddUserModal);
  };

  return (
    <>
      <div className="flex items-center justify-between w-full">
        {/* Search Input */}
        <div>
          <input
            type="text"
            placeholder="Search for a user"
            className="border border-gray-300 rounded-md 
            px-3 py-2 focus:outline-none focus:ring-2 
            focus:ring-blue-500 w-80"
          />
        </div>

        {/* Add User Button */}
        <div>
          <button
            onClick={handleAddUserForm}
            className="bg-blue-700 px-4 py-2 text-white rounded-md hover:bg-blue-800 transition flex items-center gap-2"
          >
            <FaEdit /> Add User
          </button>
        </div>
      </div>

      <div className="mt-10 mb-3">
        <h2 className="text-xl font-bold mb-3">All Students</h2>
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2">Order ID</th>
              <th className="p-2">NAME</th>
              <th className="p-2">EMAIL</th>
              <th className="p-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {tableDatas.map((user) => (
              <tr key={user.id} className="text-center border-b">
                <td className="p-2">{user.orderId}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-3 space-x-2 flex justify-center">
                  <button className="flex items-center gap-1 bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800">
                    <FaEdit /> Edit User
                  </button>
                  <button
                    onClick={handleClickRemoveUser}
                    className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    <FaTrash /> Delete User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DELETE USER MODAL */}
      {showRemoveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleCancelRemove}
          ></div>

          {/* Modal Content */}
          <div className="relative z-50 bg-white rounded p-6 w-[90%] max-w-md shadow-lg">
            <button
              onClick={handleCancelRemove}
              className="absolute top-2 right-2 text-gray-600"
            >
              <FaTimes size={20} />
            </button>
            <div className="flex justify-center mb-3 text-3xl text-red-500">
              <FaExclamationCircle />
            </div>
            <h2 className="text-xl mb-6 text-center font-semibold text-gray-500">
              Are you sure you want to remove this user?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmRemove}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={handleCancelRemove}
                className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100 transition"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD USER MODAL */}
      {showAddUserModal && <AddUser onClose={handleAddUserForm} />}
    </>
  );
};

export default Users;
