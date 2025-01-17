import { Kafka } from "kafkajs";
import WebSocket from "ws";

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || "task-manager-app",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

const consumer = kafka.consumer({
  groupId: process.env.KAFKA_GROUP_ID || "task-consumers",
});

export const startKafkaConsumer = async (websocketServer: WebSocket.Server) => {
  await consumer.connect();
  await consumer.subscribe({ topic: "task-updates", fromBeginning: true });

  consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value?.toString() || "{}");

      websocketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(event));
        }
      });
    },
  });
};
