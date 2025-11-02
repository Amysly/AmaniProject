import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { createCourse,reset } from "../../feature/courses/courseSlice";
import { getDepartments } from "../../feature/departments/departmentSlice";
interface CourseFormData {
  courseTitle: string;
  courseCode: string;
  courseUnit: number;
  courseLevel:string;
  department: string;
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
        courseLevel:"",
        department: "",
      });
      dispatch(reset());
    }
  }, [isError, isSuccess, message, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.department) {
      toast.error("Please select a department");
      return;
    }
if (formData) console.log("Fetched created courses:", formData);

    dispatch(createCourse(formData));
  };

   if (isLoading) {
      return <Spinner />;
    }
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
