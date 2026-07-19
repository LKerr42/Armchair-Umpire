const pool = require("../db");

async function getGame(req, res, id) {
    try {
        const gameRes = await pool.query(
            `SELECT * FROM games WHERE g_id = $1;`,
            [id]
        );
        const game = gameRes.rows[0];

        const [leagueRes, homeRes, awayRes] = await Promise.all([
            pool.query(`SELECT * FROM leagues WHERE l_id = $1;`, [game.g_league_id]),
            pool.query(`SELECT * FROM teams WHERE t_id = $1;`, [game.g_home_team_id]),
            pool.query(`SELECT * FROM teams WHERE t_id = $1;`, [game.g_away_team_id])
        ]);
        const league = leagueRes.rows[0];
        const homeTeam = homeRes.rows[0];
        const awayTeam = awayRes.rows[0];

        res.json({
            game,
            league,
            homeTeam,
            awayTeam
        });
    } catch (err) {
        throw err;
        return;
    }
}

async function getAllGames(req, res) {
    try {
        const result = await pool.query("SELECT * FROM games");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch games" });
    }
}

async function getGameById(req, res) {
    const id = req.params.id;

    try {
         getGame(req, res, id);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch game: " + err.message});
    }
}

module.exports = {
    getAllGames,
    getGameById
};