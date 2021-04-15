import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

let websocket; // Saves our websocket objects

export default function Home() {
  useEffect(() => {
    // Connection, empty array because we arent relying on any variables atm
    connectToWebSocket();
  }, []);

  function connectToWebSocket() {
    const url = "ws://localhost:5555"; // Note this is ws, not https. Can also be wss for more security, but server requires certificates
    websocket = new WebSocket(url); // Connects and saves url to websocket

    websocket.onopen = () => {
      console.log("Websocket connection succesful"); // Connection succesful message goes here
      setConnected(true);
    };

    websocket.onmessage = () => {
      console.log(e.data); // Logs the message event data(the message) and logs it
    };

    websocket.onclose = () => {
      console.log("Websocket connection closed"); // Can add the call to connection again, in an attempt to reconnect
      setConnected(false);
    };

    websocket.onerror = () => {
      console.log(e); // Can add the call to connection again, in an attempt to reconnect
    };
  }

  const [connected, setConnected] = useState(false);

  return (
    <div className={styles.container}>
      {connected ? "Connected" : "Offline"}
    </div>
  );
}
