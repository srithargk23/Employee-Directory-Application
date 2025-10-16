import { ObjectId } from "mongodb";

export const resolvers = {
  Query: {
    getAllEmployees: async (_, __, { db }) => {
      const employees = await db.collection("employees").find().toArray();
      return employees.map(e => ({ ...e, id: e._id.toString() }));
    },
    getEmployeeDetails: async (_, { id }, { db }) => {
      const emp = await db.collection("employees").findOne({ _id: new ObjectId(id) });
      return emp ? { ...emp, id: emp._id.toString() } : null;
    },
    getEmployeesByDepartment: async (_, { department }, { db }) => {
      const employees = await db.collection("employees").find({ department }).toArray();
      return employees.map(e => ({ ...e, id: e._id.toString() }));
    },
  },

  Mutation: {
    addEmployee: async (_, { name, position, department, salary }, { db }) => {
      const newEmployee = { name, position, department, salary };
      const result = await db.collection("employees").insertOne(newEmployee);
      return { id: result.insertedId.toString(), ...newEmployee };
    },

    updateEmployee: async (_, { id, name, position, department, salary }, { db }) => {
      const updatedFields = {};
      if (name) updatedFields.name = name;
      if (position) updatedFields.position = position;
      if (department) updatedFields.department = department;
      if (salary) updatedFields.salary = salary;

      await db.collection("employees").updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedFields }
      );

      const updated = await db.collection("employees").findOne({ _id: new ObjectId(id) });
      return { ...updated, id: updated._id.toString() };
    },

   deleteEmployee: async (_, { id }, { db }) => {
  const result = await db
    .collection("employees")
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
},
  },
};
