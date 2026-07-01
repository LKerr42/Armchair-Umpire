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
            `SELECT t.t_id, t.t_name, t.t_description, l.l_name, l.l_id
            FROM teams t
            INNER JOIN team_leagues tl
                ON t.t_id = tl.team_id
            INNER JOIN leagues l
                ON tl.league_id = l.l_id
            WHERE t.t_id = $1;`,
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