import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';

type CourseForm = {
  courseName: string
  courseCode: string
}

const Courses: React.FC = () => {
  const [courseDepartment, setCourseDepartment] = useState<string>('cse') 
  const [courseForm, setCourseForm] = useState<CourseForm>({
    courseName: '',
    courseCode: ''
  })

  const { courseName, courseCode } = courseForm

  const handleCourse = (e: React.ChangeEvent<HTMLSelectElement>) => { 
    setCourseDepartment(e.target.value)
  }

  const handleCourseForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseForm((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-2xl">
        <h2 className="text-2xl text-center font-semibold mb-4 text-gray-700">
          Create Course
        </h2>
        <form className="space-y-4" onSubmit={handleCourseSubmit}>
          <div>
            <label className="block text-gray-600 mb-1">Course Name</label>
            <input
              type="text"
              name="courseName" 
              value={courseName}
              onChange={handleCourseForm}
              placeholder="Enter course name"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Course Code</label>
            <input
              type="text"
              name="courseCode" 
              value={courseCode}
              onChange={handleCourseForm}
              placeholder="e.g. CSC101"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Department</label>
            <select
              value={courseDepartment}
              onChange={handleCourse}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="cse">Computer Science</option>
              <option value="eng">Engineering</option>
              <option value="med">Medical Science</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Save Course
          </button>
        </form>
      </div>
    </div>
  )
}

export default Courses
