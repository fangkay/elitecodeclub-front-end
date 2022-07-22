import io from "socket.io-client";
const socket = io.connect("https://bidbybid.herokuapp.com", {
  // withCredentials: true,
  // extraHeaders: {
  //   "my-custom-header": "abcd",
  // },
});

socket.on("some_message", (data) => {
  console.log("I just got a message through the socket", data);
});

export { socket };
