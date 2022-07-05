import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

socket.on("some_message", (data) => {
  console.log("I just got a message through the socket", data);
});

export { socket };
