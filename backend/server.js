const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server Backend berjalan di http://localhost:${PORT}`);
  });
};

startServer();
