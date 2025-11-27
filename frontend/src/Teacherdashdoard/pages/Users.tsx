import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaExclamationCircle, FaTimes } from "react-icons/fa";
import { getUsers, deleteUser, updateUser } from "../../feature/auth/authslice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Spinner from "../../components/Spinner";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const Users: React.FC = () => {
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const [searchUser, setSearchUser] = useState("");
  const [searchedUsers, setSearchedUsers] = useState<UserData[]>([]);

  const dispatch = useAppDispatch();
  const { users, isLoading } = useAppSelector((state) => state.auth);

  // Fetch users once on mount
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Filter users when search input changes
  useEffect(() => {
    if (searchUser.trim() === "") {
      setSearchedUsers([]); // clear search when empty
    } else {
      const filteredUsers = users.filter((user: UserData) =>
        user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
        user.email.toLowerCase().includes(searchUser.toLowerCase())
      );
      setSearchedUsers(filteredUsers);
    }
  }, [searchUser, users]);

  // Decide what to show in the table
  const displayedUsers =
    searchUser.trim() === "" ? users : searchedUsers;

  // REMOVE USER HANDLERS
  const handleClickRemoveUser = (id: string) => {
    setSelectedUserId(id);
    setShowRemoveModal(true);
  };

  const handleCancelRemove = () => {
    setShowRemoveModal(false);
    setSelectedUserId(null);
  };

  const handleConfirmRemove = () => {
    if (selectedUserId) {
      dispatch(deleteUser(selectedUserId));
      alert("User removed");
      setShowRemoveModal(false);
      setSelectedUserId(null);
    }
  };

  // ADD USER HANDLER
  const handleAddUserForm = () => {
    setShowAddUserModal(!showAddUserModal);
  };

  // UPDATE USER HANDLERS
  const handleUpdateUserForm = (user: UserData) => {
    setSelectedUser(user);
    setShowUpdateUserModal(true);
  };

  const handleCloseUpdateUser = () => {
    setShowUpdateUserModal(false);
    setSelectedUser(null);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {/* Search & Add Button */}
      <div className="flex items-center justify-between w-full">
        <SearchBar searchUser={searchUser} setSearchUser={setSearchUser} />

        <button
          onClick={handleAddUserForm}
          className="bg-blue-700 px-4 py-2 text-white rounded-md hover:bg-blue-800 transition flex items-center gap-2"
        >
          <FaEdit /> Add User
        </button>
      </div>

      {/* USERS TABLE */}
      <div className="mt-10 mb-3">
        <h2 className="text-xl font-bold mb-3 text-center">All Students</h2>

        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2">NAME</th>
              <th className="p-2">EMAIL</th>
              <th className="p-2">ROLE</th>
              <th className="p-2">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {displayedUsers.length > 0 ? (
              displayedUsers.map((user: UserData) => (
                <tr key={user._id} className="text-center border-b">
                <td className="p-2 hover:underline">
                <Link to={`/studentdetails/${user._id}`}>{user.name}</Link>
              </td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        dispatch(
                          updateUser({
                            _id: user._id,
                            updatedData: { role: e.target.value },
                          })
                        )
                      }
                      className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-3 space-x-2 flex justify-center">
                    <button
                      onClick={() => handleUpdateUserForm(user)}
                      className="flex items-center gap-1 bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleClickRemoveUser(user._id)}
                      className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-sm text-slate-500 py-2">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* DELETE USER MODAL */}
      {showRemoveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleCancelRemove}
          ></div>

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

      {/* UPDATE USER MODAL */}
      {showUpdateUserModal && selectedUser && (
        <UpdateUser user={selectedUser} onClose={handleCloseUpdateUser} />
      )}
    </>
  );
};

export default Users;
