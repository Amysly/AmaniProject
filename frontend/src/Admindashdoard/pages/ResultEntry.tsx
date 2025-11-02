import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createResults } from "../../feature/result/resultSlice";
import { getDepartments } from "../../feature/departments/departmentSlice";
import { getCoursesByAdmin } from "../../feature/courses/courseSlice";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

interface FormData {
  session: string;
  semester: string;
  level: string;
  department: string;
  courseId: string;
  name: string;
  score: string;
}

const ResultEntry: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.result);
  const { departments } = useAppSelector((state) => state.departments);
  const {  adminCourses } = useAppSelector((state) => state.courses);

  const [formData, setFormData] = useState<FormData>({
    session: "",
    semester: "",
    level: "",
    department: "",
    courseId: "",
    name: "",
    score: "",
  });

  const { session, semester, level, department, courseId, name, score } =
    formData;

  // Fetch departments and courses
  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getCoursesByAdmin());
  }, [dispatch]);

  // Handle input change
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Grade calculator
  const calculateGrade = (score: number) => {
    if (score >= 70) return "A";
    if (score >= 60) return "B";
    if (score >= 50) return "C";
    if (score >= 45) return "D";
    if (score >= 40) return "E";
    return "F";
  };

  // Submit handler
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!session || !semester || !level || !department || !courseId || !name || !score) {
      toast.error("Please fill all fields");
      return;
    }

    const grade = calculateGrade(Number(score));

    const resultData = {
      session,
      semester,
      level,
      score: Number(score),
      grade,
      courses: [courseId], // array of ObjectIds
    };

    try {
      await dispatch(createResults(resultData)).unwrap();
      toast.success("Result added successfully!");

      setFormData({
        session: "",
        semester: "",
        level: "",
        department: "",
        courseId: "",
        name: "",
        score: "",
      });
    } catch (err: any) {
      toast.error(err || "Failed to add result");
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
        Result Entry (Admin)
      </h2>

      <form
        onSubmit={onSubmit}
        className="flex flex-wrap items-center gap-4 justify-center"
      >
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Student Name"
          className="border p-3 rounded-lg w-56"
        />

        <input
          type="text"
          name="session"
          value={session}
          onChange={onChange}
          placeholder="Session (e.g. 2023/2024)"
          className="border p-3 rounded-lg w-48"
        />

        <select
          name="semester"
          value={semester}
          onChange={onChange}
          className="border p-3 rounded-lg w-44"
        >
          <option value="">Select Semester</option>
          <option value="First">First Semester</option>
          <option value="Second">Second Semester</option>
        </select>

        <select
          name="level"
          value={level}
          onChange={onChange}
          className="border p-3 rounded-lg w-36"
        >
          <option value="">Select Level</option>
          <option value="100">100 Level</option>
          <option value="200">200 Level</option>
          <option value="300">300 Level</option>
          <option value="400">400 Level</option>
        </select>

        <select
          name="department"
          value={department}
          onChange={onChange}
          className="border p-3 rounded-lg w-60"
          required
        >
          <option value="">-- Select Department --</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.departmentName}
            </option>
          ))}
        </select>

        <select
          name="courseId"
          value={courseId}
          onChange={onChange}
          className="border p-3 rounded-lg w-60"
          required
        >
          <option value="">-- Select Course --</option>
          { adminCourses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.courseCode} - {course.courseTitle}
              {course.courseUnit}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="score"
          value={score}
          onChange={onChange}
          placeholder="Score"
          className="border p-3 rounded-lg w-28"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg"
        >
          {isLoading ? "Submitting..." : "Submit Result"}
        </button>
      </form>
    </div>
  );
};

export default ResultEntry;
