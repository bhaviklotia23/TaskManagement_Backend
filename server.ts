import app from "./app";
import "reflect-metadata";
import { startKafkaConsumer } from "./src/utils/kafkaConsumers";
import websocketServer from "./src/websocket";

const PORT = process.env.PORT || 8000;
const WEBSOCKET_PORT = 8080;

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);

  try {
    await startKafkaConsumer(websocketServer);
    console.log("Kafka consumer connected and listening to events.");
  } catch (err) {
    console.error("Failed to start Kafka consumer:", err);
  }

  console.log(`WebSocket server running on ws://localhost:${WEBSOCKET_PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
