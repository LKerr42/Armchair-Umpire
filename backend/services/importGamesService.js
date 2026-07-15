require("dotenv").config();

const pool = require("../db");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchGameData(leagueApiId, date) {
    const url = "https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=" + date + "&l=" + leagueApiId;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            if (res.status == 429) {
                return await res.json();
            }

            throw new Error
                (`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.error("Unable to fetch data:", error);
        return null;
    }
}

async function importGame(gameJson, leagueLocalId) {
    //update data for db
    const result1 = await pool.query("SELECT t_id FROM teams WHERE t_api_id = $1", [gameJson.idHomeTeam]);
    const homeTeamID = result1.rows[0].t_id; 
    const result2 = await pool.query("SELECT t_id FROM teams WHERE t_api_id = $1", [gameJson.idAwayTeam]);
    const awayTeamID = result2.rows[0].t_id;   
    const timestamp = gameJson.strTimestamp + "Z";

    const query = `
        INSERT INTO games (g_api_id, g_league_id, g_home_team_id, g_away_team_id, g_start_time, g_status,
                                    g_home_score, g_home_score_extra, g_away_score_extra, g_away_score,
                                    g_venue, g_city, g_country, g_round, g_season, g_offical, g_weather, g_video)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        ON CONFLICT (g_api_id)
        DO UPDATE SET
            g_league_id = EXCLUDED.g_league_id, g_home_team_id = EXCLUDED.g_home_team_id, g_start_time = EXCLUDED.g_start_time, g_status = EXCLUDED.g_status,
            g_home_score = EXCLUDED.g_home_score, g_home_score_extra = EXCLUDED.g_home_score_extra, g_away_score_extra = EXCLUDED.g_away_score_extra, g_away_score = EXCLUDED.g_away_score,
            g_venue = EXCLUDED.g_venue, g_city = EXCLUDED.g_city, g_country = EXCLUDED.g_country, g_round = EXCLUDED.g_round, g_season = EXCLUDED.g_season, g_offical = EXCLUDED.g_offical, 
            g_weather = EXCLUDED.g_weather, g_video = EXCLUDED.g_video;
    `;

    const values = [
        gameJson.idEvent, leagueLocalId, homeTeamID, awayTeamID, timestamp, gameJson.strStatus,
        gameJson.intHomeScore, gameJson.intHomeScoreExtra, gameJson.intAwayScoreExtra, gameJson.intAwayScore,
        gameJson.strVenue, gameJson.strCity, gameJson.strCountry, gameJson.intRound, gameJson.strSeason,
        gameJson.strOfficial, gameJson.strWeather, gameJson.strVideo
    ];

    // console.log(gameJson);

    // for (const val of values) {
    //     console.log(val);
    // }

    try {
        const result = await pool.query(query, values);
        return result;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function importAllGames(leagueApiId, startDate, endDate) {
    var currDate = new Date(startDate);

    const result = await pool.query("SELECT l_id FROM leagues WHERE l_api_id = $1", [leagueApiId]);
    const leagueID = result.rows[0].l_id;  

    //JUst import one game, for debugging
    // const parsedDate = currDate.toISOString().split('T')[0];

    // console.log("Getting " + parsedDate);
    // const jsonData = await fetchGameData(leagueApiId, parsedDate);  
    // console.log(jsonData);
    
    // //increment date by a day before checking (needs to be incremented anyway)
    // currDate.setDate(currDate.getDate() + 1); 
    // for (var i = 0; i < jsonData.events.length; i++) {
    //     const res = await importGame(jsonData.events[i], leagueID);
    //     console.log(res);
    // }

    //import all games
    while (true) {
        const parsedDate = currDate.toISOString().split('T')[0];
        if (parsedDate === endDate) {
            break;
        }
        console.log("Getting " + parsedDate);

        await sleep(2000);

        const jsonData = await fetchGameData(leagueApiId, parsedDate);   
        if (jsonData.status == 429) {
            await sleep(60000);
            continue;
        }

        //increment date by a day before checking (needs to be incremented anyway)
        currDate.setDate(currDate.getDate() + 1); 

        if (jsonData.events == null) {
            continue;
        }
        
        //console.log(jsonData);

        for (var i = 0; i < jsonData.events.length; i++) {
            importGame(jsonData.events[i], leagueID);
        }
    }

    console.log("Done!");
}

async function main() {
    //A liga id: 4356

    importAllGames(4356, "2025-10-17", "2026-05-24");
}

main().catch(console.error);