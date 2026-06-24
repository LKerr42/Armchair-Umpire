const pool = require("../db");

async function getAllLeagues(req, res) {
    try {
        const result = await pool.query("SELECT * FROM leagues");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch teams" });
    }
}

async function getLeagueById(req, res) {
    const id = req.params.id;

    try {
        const result = await pool.query(
            `SELECT leagues.league_name
            FROM leagues
            WHERE leagues.l_id = $1;`,
            [id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch team" });
    }
}

module.exports = {
    getAllLeagues,
    getLeagueById
};