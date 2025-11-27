import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { createCourse, reset } from "../../feature/courses/courseSlice";
import { getDepartments } from "../../feature/departments/departmentSlice";

interface CourseFormData {
  courseTitle: string;
  courseCode: string;
  courseUnit: number;
  courseLevel: string;
  department: string;
  allowedDepartments: string[];
  isOutsideElective: boolean;
  isElective: boolean;
}

const CreateCourses: React.FC = () => {
  const dispatch = useAppDispatch();
  const { departments } = useAppSelector((state) => state.departments);
  const { isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.courses
  );

  const [formData, setFormData] = useState<CourseFormData>({
    courseTitle: "",
    courseCode: "",
    courseUnit: 0,
    courseLevel: "",
    department: "",
    allowedDepartments: [],
    isOutsideElective: false,
    isElective: false,
  });

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess) {
      toast.success("Course created successfully!");
      setFormData({
        courseTitle: "",
        courseCode: "",
        courseUnit: 0,
        courseLevel: "",
        department: "",
        allowedDepartments: [],
        isOutsideElective: false,
        isElective: false,
      });
      dispatch(reset());
    }
  }, [isError, isSuccess, message, dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      allowedDepartments: Array.from(e.target.selectedOptions, (option) => option.value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.department) {
      toast.error("Please select a department");
      return;
    }

    if (formData.isElective && formData.allowedDepartments.length === 0) {
      toast.error("Please select allowed departments for this elective course");
      return;
    }

    dispatch(createCourse(formData));
  };

  if (isLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold mb-4">Create New Course</h2>

      <input
        type="text"
        name="courseTitle"
        placeholder="Course Title"
        value={formData.courseTitle}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-lg"
        required
      />

      <input
        type="text"
        name="courseCode"
        placeholder="Course Code"
        value={formData.courseCode}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-lg"
        required
      />

      <input
        type="number"
        name="courseUnit"
        placeholder="Course Unit"
        value={formData.courseUnit}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-lg"
        required
      />

      <input
        type="text"
        name="courseLevel"
        placeholder="Course Level"
        value={formData.courseLevel}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-lg"
        required
      />

      <select
        name="department"
        value={formData.department}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-lg"
        required
      >
        <option value="">-- Select Department --</option>
        {departments.map((dept) => (
          <option key={dept._id} value={dept._id}>
            {dept.departmentName}
          </option>
        ))}
      </select>

      {/* Elective & Outside Elective */}
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isElective"
            checked={formData.isElective}
            onChange={handleCheckboxChange}
            className="accent-green-600"
          />
          <span>Is Elective?</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isOutsideElective"
            checked={formData.isOutsideElective}
            onChange={handleCheckboxChange}
            className="accent-purple-600"
          />
          <span>Is Outside Elective?</span>
        </label>
      </div>

      {/* Allowed Departments for Electives */}
      {formData.isElective && (
        <div>
          <label className="font-medium text-gray-700 mb-1">Allowed Departments</label>
          <select
            multiple
            value={formData.allowedDepartments}
            onChange={handleMultiSelectChange}
            className="w-full px-3 py-2 border rounded-lg"
          >
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.departmentName}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Create Course"}
      </button>
    </form>
  );
};

export default CreateCourses;
