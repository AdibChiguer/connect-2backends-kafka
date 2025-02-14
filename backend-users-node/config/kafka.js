const kafka = require("kafka-node");
const { KafkaClient, Producer } = kafka;

const client = new KafkaClient({ kafkaHost: "localhost:9092" });
const producer = new Producer(client);

producer.on("ready", () => {
  console.log("Kafka Producer is ready.");
});

producer.on("error", (err) => {
  console.error("Kafka Producer error:", err);
});

const sendMessage = (message) => {
  const eventWithTimestamp = {
    ...message,
    timestamp: new Date().toISOString(),
  };

  const payloads = [{ topic: "book-loans", messages: JSON.stringify(eventWithTimestamp) }];
  producer.send(payloads, (err, data) => {
    if (err) console.error("Kafka send error:", err);
    else console.log("Kafka message sent:", data);
  });
};

module.exports = { sendMessage };