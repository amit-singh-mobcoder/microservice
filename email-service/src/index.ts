import { app } from "./app";
import amqp from "amqplib";
import { configDotenv } from "dotenv";
import { EmailService } from "./services/EmailService";

configDotenv();

const PORT = process.env.PORT;
if (!PORT) {
  throw new Error("Environment variable PORT must be defined");
}

export let channel: amqp.Channel | null = null;
export let connection: amqp.Connection | null = null;

async function connectQueue() {
  try {
    console.log("Connecting to RabbitMQ...");
    connection = await amqp.connect(process.env.RABBITMQ_URL!);
    channel = await connection.createChannel();

    await channel.assertQueue("user_queue");
    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    process.exit(1); 
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
    await connectQueue();

    const emailService = new EmailService();
    await emailService.start();

    const server = app.listen(PORT, () => {
      console.log(`Email Service is listening at http://localhost:${PORT}`);
    });


    const shutdown = async () => {
      console.log("Shutting down gracefully...");
      server.close(async () => {
        console.log("HTTP server closed");
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
