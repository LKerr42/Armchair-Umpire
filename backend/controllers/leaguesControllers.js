const pool = require("../db");

async function getAllLeagues(req, res) {
    try {
        const result = await pool.query("SELECT * FROM leagues");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch leagues" });
    }
}

async function getLeagueById(req, res) {
    const id = req.params.id;

    try {
        const result = await pool.query(
            `SELECT l.l_name, l.l_curr_season
            FROM leagues l
            WHERE l.l_id = $1;`,
            [id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch league" });
    }
}

module.exports = {
    getAllLeagues,
    getLeagueById
};