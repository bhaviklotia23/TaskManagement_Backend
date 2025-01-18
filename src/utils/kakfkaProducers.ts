import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || "task-manager-app",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

const producer = kafka.producer();

export const sendKafkaEvent = async (topic: string, message: object) => {
  try {
    console.log(`Connecting to Kafka...`);
    await producer.connect();
    console.log(`Connected to Kafka. Sending message to topic: ${topic}`);
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log(`Message sent successfully: ${JSON.stringify(message)}`);
  } catch (error) {
    console.error(`Failed to send message to Kafka:`, error);
  }
};

export default producer;
