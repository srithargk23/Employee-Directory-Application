import { ApolloServer } from "apollo-server";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

dotenv.config();

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function startServer() {
  try {
    await client.connect();
    const db = client.db("employee_directory");
    console.log("✅ Connected to MongoDB");

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => ({ db }),
    });

    const { url } = await server.listen({ port: 4000 });
    console.log(`🚀 Server ready at ${url}`);
  } catch (err) {
    console.error("❌ Error starting server:", err);
  }
}

startServer();
