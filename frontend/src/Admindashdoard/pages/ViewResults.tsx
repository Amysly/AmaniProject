import React from 'react'

const ViewResults: React.FC = () => {
   const results = [
    {
      id: 1,
      student: "John Doe",
      department: "Computer Science",
      course: "Web Development",
      code: "CSC301",
      score: 85,
      grade: "A",
    },
    {
      id: 2,
      student: "Jane Smith",
      department: "Business Admin",
      course: "Marketing 101",
      code: "BUS201",
      score: 72,
      grade: "B",
    },
    {
      id: 3,
      student: "Mark David",
      department: "Engineering",
      course: "Thermodynamics",
      code: "ENG305",
      score: 60,
      grade: "C",
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Results List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Student</th>
            <th className="border border-gray-300 px-4 py-2">Department</th>
            <th className="border border-gray-300 px-4 py-2">Course</th>
            <th className="border border-gray-300 px-4 py-2">Code</th>
            <th className="border border-gray-300 px-4 py-2">Score</th>
            <th className="border border-gray-300 px-4 py-2">Grade</th>
          </tr>
        </thead>
        <tbody>
          {results.map((res) => (
            <tr key={res.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{res.student}</td>
              <td className="border border-gray-300 px-4 py-2">{res.department}</td>
              <td className="border border-gray-300 px-4 py-2">{res.course}</td>
              <td className="border border-gray-300 px-4 py-2">{res.code}</td>
              <td className="border border-gray-300 px-4 py-2">{res.score}</td>
              <td className="border border-gray-300 px-4 py-2">{res.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewResults
