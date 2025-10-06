import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCourses, deleteCourse, reset } from "../../feature/courses/courseSlice";
import UpdateCourse from "./UpdateCourse";
import { FaEdit, FaTrash, FaExclamationCircle, FaTimes } from "react-icons/fa";

interface Department {
  _id: string;
  departmentName: string;
}

interface Course {
  _id: string;
  courseTitle: string;
  courseCode: string;
  courseUnit: number;
  department:  Department;
}

const AllCourses: React.FC = () => {
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showUpdateCourseModal, setShowUpdateCourseModal] = useState(false);

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const dispatch = useAppDispatch();
  const { courses, isLoading, isError, message } = useAppSelector(
    (state) => state.courses
  );

  // REMOVE COURSES HANDLERS
  const handleClickRemoveCourse = (id: string) => {
    setSelectedCourseId(id);
    setShowRemoveModal(true);
  };

  const handleCancelRemove = () => {
    setShowRemoveModal(false);
    setSelectedCourseId(null);
  };

  const handleConfirmRemove = () => {
    if (selectedCourseId) {
      dispatch(deleteCourse(selectedCourseId));
      setShowRemoveModal(false);
      setSelectedCourseId(null);
    }
  };

  // UPDATE COURSE HANDLERS
  const handleUpdateCourseForm = (course: Course) => {
    setSelectedCourse(course);
    setShowUpdateCourseModal(true);
  };

  const handleCloseUpdateCourse = () => {
    setShowUpdateCourseModal(false);
    setSelectedCourse(null);
  };

  // Fetch courses on mount
  useEffect(() => {
    dispatch(getCourses());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  // Show notifications
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message,]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mt-10 mb-3">
      <h2 className="text-xl font-bold mb-3 text-center">All Courses</h2>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-2">COURSE TITLE</th>
            <th className="p-2">COURSE CODE</th>
            <th className="p-2">COURSE UNIT</th>
            <th className="p-2">DEPARTMENT</th>
            <th className="p-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course: Course) => (
              <tr key={course._id} className="text-center border-b">
                <td className="p-2">{course.courseTitle}</td>
                <td className="p-2">{course.courseCode}</td>
                <td className="p-2">{course.courseUnit}</td>
                <td className="p-2">{course.department?.departmentName || "No department"}</td>
                <td className="p-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleUpdateCourseForm(course)}
                    className="flex items-center gap-1 bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleClickRemoveCourse(course._id)}
                    className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="text-center text-sm text-slate-500 py-2"
              >
                No courses found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* DELETE COURSE MODAL */}
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
              Are you sure you want to remove this course?
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

      {/* UPDATE COURSE MODAL */}
      {showUpdateCourseModal && selectedCourse && (
        <UpdateCourse course={selectedCourse} onClose={handleCloseUpdateCourse} />
      )}
    </div>
  );
};

export default AllCourses;
