import React, { useState, useEffect } from 'react'
import Spinner from '../../components/Spinner';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toast } from "react-toastify";
import { createAssignment } from '../../feature/assignment/assignmentSlice'
import { getCoursesByAdmin } from '../../feature/courses/courseSlice';

interface AssignmentData {
  assignmentQuestion: string;
  submissionDeadline: string;
  level: string;
  coursesId: string[];
}

const CreateAss: React.FC = () => {
  const dispatch = useAppDispatch();

  const { courses, isLoading } = useAppSelector((state) => state.courses);

  const [formData, setFormData] = useState<AssignmentData>({
    assignmentQuestion: "",
    submissionDeadline: "",
    level: "",
    coursesId: [],
  });

  const { assignmentQuestion, submissionDeadline, level, coursesId } = formData;

  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // SUBMIT
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!assignmentQuestion || !submissionDeadline || !level || !coursesId) {
      toast.error("Please fill in all fields");
      return;
    }

    dispatch(
      createAssignment({
        assignmentQuestion,
        submissionDeadline,
        level,
        coursesId,
      })
    );

    // Reset
    setFormData({
      assignmentQuestion: "",
      submissionDeadline: "",
      level: "",
      coursesId: [],
    });
  };

  useEffect(() => {
    dispatch(getCoursesByAdmin());
  }, [dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <h1 className='text-center mb-4 text-3xl'>Create Assignment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <textarea
          name="assignmentQuestion"
          placeholder="Write your assignment question"
          value={assignmentQuestion}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <input
          type="text"
          name="submissionDeadline"
          placeholder="Submission deadline"
          value={submissionDeadline}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />

        <select
          name="level"
          value={level}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        >
          <option value="">Select Level</option>
          <option value="100 level">100 level</option>
          <option value="200 level">200 level</option>
          <option value="300 level">300 level</option>
          <option value="400 level">400 level</option>
        </select>

        <select
          name="coursesId"
          value={coursesId}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        >
          <option value="">-- Select Course --</option>
          {courses?.map((course) => (
            <option key={course._id} value={course._id}>
              {course.courseTitle}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg"
        >
          Create Assignment
        </button>

      </form>
    </div>
  );
};

export default CreateAss;
