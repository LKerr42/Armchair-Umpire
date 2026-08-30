require("dotenv").config();

const pool = require("../db");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchAllGamesByTeam(teamID) {
    const result = await pool.query("SELECT * FROM games WHERE g_home_team_id = $1 OR g_away_team_id = $1", [teamID]);

    //console.log(result);

    return result.rows; 
}

async function calculateStanding(teamID) {
    const allGames = await fetchAllGamesByTeam(teamID);

    let played = 0, won = 0, drawn = 0, lost = 0;
    let goalsFor = 0, goalsAgainst = 0, points = 0;

    allGames.forEach(game => {
        if (game.g_round > 26) return;

        //console.log(game.g_home_team_id + ", " + game.g_away_team_id); 
        let scoreSelf, scoreOpp;

        //set score for this team and the opponent
        if (game.g_home_team_id == teamID) {
            scoreSelf = game.g_home_score;
            scoreOpp = game.g_away_score;
        } else {
            scoreSelf = game.g_away_score;
            scoreOpp = game.g_home_score;   
        }

        //update values
        played++;
        if (scoreSelf > scoreOpp) {
            won++;
            points += 3;
        } else if (scoreSelf == scoreOpp) {
            drawn++
            points++;
        } else {
            lost++;
        }

        goalsFor += scoreSelf;
        goalsAgainst += scoreOpp;
    });

    return {
        team_id: teamID,
        league_id: 6,
        season: "2025-2026",
        gamesPlayed: played,
        gamesWon: won,
        gamesLost: lost,
        gamesDrawn: drawn,
        teamGoalsFor: goalsFor,
        teamGoalsAgainst: goalsAgainst,
        teamPoints: points        
    };
}

async function setStandingRecord(teamData) {
    const query = `
        INSERT INTO league_standings (ls_league_id, ls_team_id, ls_season,
                                    ls_played, ls_won, ls_drawn, ls_lost,
                                    ls_goals_for, ls_goals_against, ls_points)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (ls_season, ls_team_id)
        DO UPDATE SET
        ls_played = EXCLUDED.ls_played,
        ls_won = EXCLUDED.ls_won,
        ls_drawn = EXCLUDED.ls_drawn,
        ls_lost = EXCLUDED.ls_lost,
        ls_goals_for = EXCLUDED.ls_goals_for,
        ls_goals_against = EXCLUDED.ls_goals_against,
        ls_points = EXCLUDED.ls_points,
        ls_updated_at = CURRENT_TIMESTAMP;
    `;

    const values = [
        teamData.league_id, teamData.team_id, teamData.season, 
        teamData.gamesPlayed, teamData.gamesWon, teamData.gamesDrawn, teamData.gamesLost,
        teamData.teamGoalsFor, teamData.teamGoalsAgainst, teamData.teamPoints
    ];

    try {
        await pool.query(query, values);
        console.log("Insert successful!");
        //return result;
    } catch (err) {
        console.error(err);
        //return null;
    }
}

async function main() {
    const res = await pool.query("SELECT * FROM team_leagues WHERE league_id = $1", [6]);
    const teams = res.rows;

    for (const team of teams) {
        const teamData = await calculateStanding(team.team_id);
        await setStandingRecord(teamData);
    }
    
    console.log("All teams added succsessfully!");
}

main().catch(console.error);