const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

//create an express app

const app = express();
const PORT = 3020;

// Create an HTTP server
const server = http.createServer(app);

// Attach Socket.IO to the HTTP server
const io = new Server(server);

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log(`A user connection:`, socket.id);

  // Listen for chat messages from clients
  socket.on("Chat message", (msg) => {
    console.log("Message received", msg);

    // Broadcast the message to all connected clients
    io.emit("Chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
