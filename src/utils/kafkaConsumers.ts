import { Kafka } from "kafkajs";
import WebSocket from "ws";

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || "task-manager-app",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

export const consumer = kafka.consumer({
  groupId: process.env.KAFKA_GROUP_ID || "task-consumers",
});

export const startKafkaConsumer = async (websocketServer: WebSocket.Server) => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: "task-updates", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          console.log("Received message from Kafka:", message.value?.toString());
          const event = JSON.parse(message.value?.toString() || "{}");

          websocketServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(event));
              console.log(`Notification sent to WebSocket client: ${JSON.stringify(event)}`);
            }
          });
        } catch (error) {
          console.error("Error processing Kafka message:", error);
        }
      },
    });
  } catch (error) {
    console.error("Failed to start Kafka consumer:", error);
    setTimeout(() => startKafkaConsumer(websocketServer), 5000); // Retry after 5 seconds
  }
};


