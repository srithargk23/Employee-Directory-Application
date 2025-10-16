"use client";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import Link from "next/link";

const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees {
    getAllEmployees {
      id
      name
      position
      department
      salary
    }
  }
`;

export default function ClientHome() {
  const { data, loading, error } = useQuery(GET_ALL_EMPLOYEES);
  const [department, setDepartment] = useState("All");

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error.message}</p>;

  const employees = data.getAllEmployees;
  const departments = ["All", ...new Set(employees.map((e) => e.department))];

  const filtered = department === "All"
    ? employees
    : employees.filter((e) => e.department === department);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Employee Directory</h1>

      {/* Department Filter */}
      <div className="flex justify-center mb-6">
        <label className="mr-2 font-medium">Filter by Department:</label>
        <select
          className="border px-3 py-1 rounded"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((e) => (
          <div key={e.id} className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              <Link href={`/employee/${e.id}`}>{e.name}i</Link>
            </h2>
            <p className="text-gray-600 mb-1"><strong>Position:</strong> {e.position}</p>
            <p className="text-gray-600 mb-1"><strong>Department:</strong> {e.department}</p>
            <p className="text-gray-600"><strong>Salary:</strong> ₹{e.salary}</p>
          </div>
        ))}
      </div>

      {/* Add Employee Button */}
      <div className="flex justify-center mt-6">
        <Link href="/add">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Add New Employee
          </button>
        </Link>
      </div>
    </div>
  );
}
