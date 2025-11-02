import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateCourse, getCoursesByAdmin } from "../../feature/courses/courseSlice";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

interface Department {
  _id: string;
  departmentName: string;
}

interface Course {
  _id: string;
  courseTitle: string;
  courseCode: string;
  courseUnit: number;
  department: Department;
}

interface UpdateCourseProps {
  course: Course;
  onClose: () => void;
}

const UpdateCourse: React.FC<UpdateCourseProps> = ({ course, onClose }) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    courseTitle: course.courseTitle,
    courseCode: course.courseCode,
    courseUnit: course.courseUnit,
    department: course.department?.departmentName || "",
  });

  const { isLoading } = useAppSelector((state) => state.courses);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        updateCourse({
          _id: course._id,
          updatedData: {
            courseTitle: formData.courseTitle,
            courseCode: formData.courseCode,
            courseUnit: Number(formData.courseUnit),
            department: formData.department,
          },
        })
      ).unwrap();

      toast.success("Course updated successfully!");
      dispatch(getCoursesByAdmin());
      onClose();
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative z-50 bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Update Course</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleChange}
            placeholder="Course Title"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            placeholder="Course Code"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="courseUnit"
            value={formData.courseUnit}
            onChange={handleChange}
            placeholder="Course Unit"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department ID or Name"
            className="border p-2 rounded"
            required
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
