"use client";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

const ADD_EMPLOYEE = gql`
  mutation AddEmployee($name: String!, $position: String!, $department: String!, $salary: Int!) {
    addEmployee(name: $name, position: $position, department: $department, salary: $salary) {
      id
      name
    }
  }
`;

export default function AddEmployee() {
  const [form, setForm] = useState({ name: "", position: "", department: "", salary: "" });
  const [addEmployee, { loading, error }] = useMutation(ADD_EMPLOYEE);
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee({ variables: { ...form, salary: parseInt(form.salary) } });
      router.push("/"); // back to home
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">Add Employee</h2>

        {["name", "position", "department", "salary"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "salary" ? "number" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
        >
          {loading ? "Adding..." : "Add Employee"}
        </button>

        {error && <p className="text-red-500 text-center">Error: {error.message}</p>}
      </form>
    </div>
  );
}
