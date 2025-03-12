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

app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this as needed in production
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());

// Mount your routes
app.use("/projects", projectRoutes);
app.use("/task", taskRoutes);
app.use("/", authRoutes);
app.use("/", infoRoutes);
app.use("/", timesheetRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Use the Render provided port and bind to 0.0.0.0
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// OPTIONAL: Integrate socket.io if needed
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // adjust as needed for production
    methods: ["GET", "POST"],
  },
});

// Example socket.io connection handling
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  // Handle socket events here
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server Running on port ${PORT}`);
});
