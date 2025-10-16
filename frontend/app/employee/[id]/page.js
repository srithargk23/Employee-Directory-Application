"use client";

import { use } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import EmployeeForm from "@/components/EmployeeForm";

const GET_EMPLOYEE_DETAILS = gql`
  query GetEmployeeDetails($id: ID!) {
    getEmployeeDetails(id: $id) {
      id
      name
      position
      department
      salary
    }
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $name: String
    $position: String
    $department: String
    $salary: Int
  ) {
    updateEmployee(
      id: $id
      name: $name
      position: $position
      department: $department
      salary: $salary
    ) {
      id
      name
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

export default function EmployeeDetail({ params }) {
  // ✅ Unwrap params using React.use()
  const { id } = use(params);
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_EMPLOYEE_DETAILS, {
    variables: { id },
  });

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted: () => {
      toast.success("Employee updated successfully!");
      setTimeout(() => router.push("/"), 1000);
    },
    onError: (err) => toast.error(err.message),
  });

  const [deleteEmployee, { loading: deleting }] = useMutation(DELETE_EMPLOYEE, {
    variables: { id },
    onCompleted: () => {
      toast.success("Employee deleted successfully!");
      setTimeout(() => router.push("/"), 1000);
    },
    onError: (err) => toast.error(err.message),
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading employee details...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );

  const employee = data?.getEmployeeDetails;
  if (!employee)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">Employee not found.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <Toaster position="top-center" />
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Edit Employee
        </h1>

        {/* ✅ Employee Form */}
        <EmployeeForm
          initialData={employee}
          onSubmit={(values) =>
            updateEmployee({
              variables: { id: employee.id, ...values },
            })
          }
          submitLabel="Update Employee"
        />

        {/* ✅ Delete Button */}
        <button
          onClick={() => {
            if (confirm("Are you sure you want to delete this employee?")) {
              deleteEmployee();
            }
          }}
          disabled={deleting}
          className="w-full mt-4 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete Employee"}
        </button>
      </div>
    </div>
  );
}
