import { app } from "./app";
import { DatabaseConnection } from "./config/DatabaseConnection";
import amqp from "amqplib";
import { configDotenv } from "dotenv";

configDotenv();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

if (!PORT || !MONGODB_URL) {
  throw new Error("Environment variables PORT and MONGODB_URL must be defined");
}

const db = new DatabaseConnection("UserServiceMS", MONGODB_URL);

export let channel: amqp.Channel | null = null;
export let connection: amqp.Connection | null = null;

async function connectQueue() {
  try {
    connection = await amqp.connect("amqp://localhost:5672");
    channel = await connection.createChannel();

    await channel.assertQueue("user_queue");
    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    throw error; 
  }
}

async function disconnectQueue() {
  try {
    if (channel) await channel.close();
    if (connection) await connection.close();
    console.log("RabbitMQ connection closed");
  } catch (error) {
    console.error("Error closing RabbitMQ connection:", error);
  }
}

const startServer = async () => {
  try {
    await db.connect();
    await connectQueue();

    const server = app.listen(PORT, () => {
      console.log(`User:Service is listening at http://localhost:${PORT}`);
    });

    const shutdown = async () => {
      console.log("Shutting down gracefully...");
      server.close(async () => {
        console.log("HTTP server closed");
        await db.disconnect();
        await disconnectQueue();
        process.exit(0);
      });
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown); 

  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();
