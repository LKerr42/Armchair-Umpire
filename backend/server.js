const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// app.get("/api/test", (req,res)=>{
//     res.json({message:"Backend working"});
// });

app.get("/api/teams", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM teams;");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: "Database error"});
    }
});

app.listen(5000, ()=>{
    console.log("Server running on port 5000");
});