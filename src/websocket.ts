import WebSocket from "ws";
import { startKafkaConsumer } from "./utils/kafkaConsumers";

const websocketServer = new WebSocket.Server({ port: 8080 });

websocketServer.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

startKafkaConsumer(websocketServer);

export default websocketServer;