const express = require("express");
const cors = require("cors");

import { Pool } from "pg";

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req,res)=>{
    res.json({message:"Backend working"});
});

app.listen(5000, ()=>{
    console.log("Server running on port 5000");
});