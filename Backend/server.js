import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import taskRoutes from "./routes/task.js";
import projectRoutes from "./routes/project.js";
import authRoutes from "./routes/auth.js";
import infoRoutes from "./routes/information.js";
import timesheetRoutes from "./routes/timesheet.js";

const app = express();

// Enable CORS – adjust the origin for production if needed
app.use(
  cors({
    origin: "http://localhost:5173", // update this to your production frontend URL if needed
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount routes
app.use("/projects", projectRoutes);
app.use("/task", taskRoutes);
app.use("/", authRoutes);
app.use("/", infoRoutes);
app.use("/", timesheetRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Use Render's provided port, defaulting to 3000 locally.
const PORT = process.env.PORT || 3000;

// Create an HTTP server from the Express app.
const server = http.createServer(app);

// OPTIONAL: Initialize socket.io if you need real‑time features.
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // update as needed for production
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  // Add your socket event handlers here
});

console.log("Binding to port:", process.env.PORT || 3000);
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server Running on port ${PORT}`);
});
