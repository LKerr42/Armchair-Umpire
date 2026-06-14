const express = require("express");
const cors = require("cors");

const teamsRoutes = require("./routes/teams");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/teams", teamsRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});