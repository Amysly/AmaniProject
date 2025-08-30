import React, { useState } from 'react'

const Department:React.FC = () => {
  const [departmentForm, setDepartmentForm] = useState<string>('')

  const handleFormSubmit =(e:React.FormEvent) =>{
      e.preventDefault()
  }
  const handleDepartmentForm = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setDepartmentForm(e.target.value)
  }
   return (
    <div className="mt-5 flex justify-center items-center bg-gray-100 p-8">
    <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-2xl">
      <h2 className="text-2xl text-center font-semibold mb-4 text-gray-700">
        Create Department
      </h2>
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        <div>
          <label className="block text-gray-600 mb-1">Department Name</label>
          <input
            type="text"
            onChange={handleDepartmentForm}
            value={departmentForm}
            placeholder="Enter department name"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save Department
        </button>
      </form>
    </div>
    </div>
  );
}

export default Department
