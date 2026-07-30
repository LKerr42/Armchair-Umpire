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
        res.status(500).json({ error: "Failed to fetch game: " + err.message});
        return;
    }
}

async function getAllGames(req, res) {
    try {
        const gameRes = await pool.query(
            `SELECT
                g.g_id,
                g.g_league_id, 
                g.g_home_team_id, 
                g.g_away_team_id, 
                g.g_status, 
                g.g_home_score, 
                g.g_home_score_extra, 
                g.g_away_score, 
                g.g_away_score_extra, 
                g.g_round,

                home.t_name AS home_t_name,
                away.t_name AS away_t_name,

                l.l_name AS l_name

            FROM games g

            JOIN teams home
                ON home.t_id = g.g_home_team_id

            JOIN teams away
                ON away.t_id = g.g_away_team_id

            JOIN leagues l
                ON l.l_id = g.g_league_id

            ORDER BY g.g_start_time;`
        );
        
        res.json(gameRes.rows);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch game: " + err.message});
        return;
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