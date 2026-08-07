const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Backend berjalan di http://localhost:${PORT}`);
});
