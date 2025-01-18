import app from "./app";
import "reflect-metadata";
import { consumer } from "./src/utils/kafkaConsumers";
import websocketServer from "./src/websocket";

const PORT = process.env.PORT || 8000;
const WEBSOCKET_PORT = 8080;

app.listen(PORT, () => {
  console.log(`HTTP server running on http://localhost:${PORT}`);
  console.log(`WebSocket server running on ws://localhost:${WEBSOCKET_PORT}`);
});

const shutdown = async () => {
  console.log("Shutting down gracefully...");
  try {
    console.log("Closing Kafka consumer...");
    await consumer.disconnect();
    console.log("Kafka consumer disconnected.");

    console.log("Closing WebSocket server...");
    websocketServer.close(() => {
      console.log("WebSocket server closed.");
      process.exit(0);
    });
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);