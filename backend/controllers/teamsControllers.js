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
        const teamResult = await pool.query(
            `SELECT *
            FROM teams t
            INNER JOIN team_leagues tl
                ON t.t_id = tl.team_id
            INNER JOIN leagues l
                ON tl.league_id = l.l_id
            WHERE t.t_id = $1;`,
            [id]
        );

        const gamesResult = await pool.query(
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
                g.g_start_time,
                g.g_video,

                home.t_name AS home_t_name,
                away.t_name AS away_t_name,

                l.l_id,
                l.l_name AS l_name,
                l.l_curr_season

            FROM games g

            JOIN teams home
                ON home.t_id = g.g_home_team_id

            JOIN teams away
                ON away.t_id = g.g_away_team_id

            JOIN leagues l
                ON l.l_id = g.g_league_id

            WHERE g.g_home_team_id = $1 
                OR g.g_away_team_id = $1

            ORDER BY g.g_start_time DESC
            LIMIT 4;`,
            [id]
        );

        const team = teamResult.rows[0];
        const recentGames = [gamesResult.rows[0], gamesResult.rows[1], gamesResult.rows[2], gamesResult.rows[3]];

        const tableResult = await pool.query(
            `SELECT 
                ls.ls_id,
                ls.ls_league_id,
                ls.ls_team_id,
                ls.ls_season,
                ls.ls_played,
                ls.ls_won,
                ls.ls_drawn,
                ls.ls_lost,
                ls.ls_goals_for,
                ls.ls_goals_against,
                (ls.ls_goals_for - ls.ls_goals_against) AS ls_goals_difference,
                ls.ls_points,
                t.t_id,
                t.t_name
            FROM league_standings ls
            JOIN teams t
                ON ls.ls_team_id = t.t_id
            WHERE ls.ls_season = $1
                AND ls.ls_league_id = $2
            ORDER BY ls.ls_points DESC, ls_goals_difference DESC;`,
            [gamesResult.rows[0].l_curr_season, gamesResult.rows[0].l_id]
        );
        
        const table = tableResult.rows; 

        res.json({
            team,
            recentGames,
            table
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch team: " + err.message });
    }
}

module.exports = {
    getAllTeams,
    getTeamById
};