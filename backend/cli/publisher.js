import dotenv from 'dotenv';
import mqtt from 'mqtt';
import { Device } from '../models/Device.js';

dotenv.config();

const MQTT_BROKER_HOST = process.env.MQTT_BROKER_HOST;
const MQTT_BROKER_PORT = process.env.MQTT_BROKER_PORT;
const MQTT_BROKER_PROTOCOL = process.env.MQTT_BROKER_PROTOCOL;
const MQTT_USERNAME = process.env.MQTT_USERNAME;
const MQTT_PASSWORD = process.env.MQTT_PASSWORD;

const options = {
  host: MQTT_BROKER_HOST,
  port: MQTT_BROKER_PORT,
  protocol: MQTT_BROKER_PROTOCOL,
  username: MQTT_USERNAME,
  password: MQTT_PASSWORD,
};
export const client = mqtt.connect(options);

export const connect = async () => {
    // console.log(topics[1]);
    try {
      
      client.on("error", function (error) {
        console.log(error);
      });
      // Sự kiện khi kết nối thành công
      client.on("connect", () => {
        console.log("Đã kết nối thành công đến MQTT Broker");
      });
      client.on("close", () => {
        console.log("Kết nối đã đóng");
      });
      client.subscribe('messages');
      client.subscribe('LED');
      client.subscribe('123');
      client.publish('messages', 'Hello, this message was received!');
      client.on("message", async (topic, message) => {
        if (topic == "messages" || topic == "123") {
          return console.log(`Received message from topic "${topic}": ${message}`);
        }
        // check if user exists
        const device = await Device.findOne({ topic })
        try {
          device.status = message;
          await device.save();
          if (!device) {
              return console.log("error");
          }
          return console.log(`Device update successfully "${topic}": ${message}`);
      } catch (error) {
          console.log(error.message);
      }
    });
    } catch (err) {
      console.log(err);
    }
  };


  