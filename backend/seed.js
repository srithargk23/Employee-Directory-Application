import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

const departments = [
  { name: "Engineering", floor: 3 },
  { name: "HR", floor: 2 },
  { name: "Finance", floor: 4 },
];

const employees = [
  { name: "Alice Johnson", position: "Software Engineer", department: "Engineering", salary: 90000 },
  { name: "Bob Smith", position: "DevOps Engineer", department: "Engineering", salary: 85000 },
  { name: "Carol White", position: "HR Manager", department: "HR", salary: 70000 },
  { name: "David Brown", position: "Accountant", department: "Finance", salary: 75000 },
  { name: "Eve Adams", position: "Financial Analyst", department: "Finance", salary: 80000 },
];

async function seedData() {
  try {
    await client.connect();
    const db = client.db("employee_directory");

    const deptCollection = db.collection("departments");
    const empCollection = db.collection("employees");

    await deptCollection.deleteMany({});
    await empCollection.deleteMany({});

    await deptCollection.insertMany(departments);
    await empCollection.insertMany(employees);

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  } finally {
    await client.close();
  }
}

seedData();
