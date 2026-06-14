const pool = require("../db");

async function getAllTeams(req, res) {
    try {
        const result = await pool.query("SELECT * FROM teams");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch teams" });
    }
}

async function getTeamById(req, res) {
    const id = req.params.id;

    try {
        const result = await pool.query(
            "SELECT * FROM teams WHERE id = $1",
            [id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch team" });
    }
}

module.exports = {
    getAllTeams,
    getTeamById
};