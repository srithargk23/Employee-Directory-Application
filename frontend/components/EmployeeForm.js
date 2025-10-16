"use client";

import { useState, useEffect } from "react";

export default function EmployeeForm({ initialData, onSubmit, submitLabel }) {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    salary: "",
  });

  const [errors, setErrors] = useState({});

  // Pre-fill form for edit
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        position: initialData.position || "",
        department: initialData.department || "",
        salary: initialData.salary || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.position.trim()) errs.position = "Position is required";
    if (!formData.department.trim()) errs.department = "Department is required";
    if (!formData.salary || isNaN(Number(formData.salary)))
      errs.salary = "Salary must be a number";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ 
      ...formData, 
      salary: Number(formData.salary) 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Position</label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Department</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Salary</label>
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {submitLabel}
      </button>
    </form>
  );
}
