require("dotenv").config();

const pool = require("../db");

async function fetchLeagueTeams(leagueApiId) {
    const url = "https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?id=" + leagueApiId;

    try {
        const res = await fetch(url);

        if (!res.ok) {
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

async function fetchLeagueJson(leagueApiId) {
    //fetch team data
    const url = "https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=" + leagueApiId;

    try {
        const res = await fetch(url);

        if (!res.ok) {
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

async function fetchTeamJson(teamApiId) {
    //fetch team data
    const url = "https://www.thesportsdb.com/api/v1/json/123/lookupteam.php?id=" + teamApiId;

    try {
        const res = await fetch(url);

        if (!res.ok) {
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

async function importTeam(teamJson, leagueId) {
    const locationData = (teamJson.strLocation || "").split(", ");
    let teamID;

    const query = `
        INSERT INTO teams (t_api_id, t_name, t_name_alt, t_name_short, 
                                    t_year_formed, t_stadium, t_country, t_city, t_gender, 
                                    t_website, t_twitter, t_youtube, t_instagram, t_facebook,
                                    t_description, t_colour_1, t_colour_2, t_colour_3)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        ON CONFLICT (t_api_id)
        DO UPDATE SET
            t_name = EXCLUDED.t_name, t_name_alt = EXCLUDED.t_name_alt, t_name_short = EXCLUDED.t_name_short, 
            t_year_formed = EXCLUDED.t_year_formed, t_stadium = EXCLUDED.t_stadium, t_country = EXCLUDED.t_country, t_city = EXCLUDED.t_city, t_gender = EXCLUDED.t_gender, 
            t_website = EXCLUDED.t_website, t_twitter = EXCLUDED.t_twitter, t_youtube = EXCLUDED.t_youtube, t_instagram = EXCLUDED.t_instagram, t_facebook = EXCLUDED.t_facebook,
            t_description = EXCLUDED.t_description, t_colour_1 = EXCLUDED.t_colour_1, t_colour_2 = EXCLUDED.t_colour_2, t_colour_3 = EXCLUDED.t_colour_3
        RETURNING t_id;
    `;

    const values = [
        teamJson.idTeam, teamJson.strTeam, teamJson.strTeamAlternate, teamJson.strTeamShort,
        teamJson.intFormedYear, teamJson.strStadium, teamJson.strCountry, locationData[0], teamJson.strGender, 
        teamJson.strWebsite, teamJson.strTwitter, teamJson.strYoutube, teamJson.strInstagram, teamJson.strFacebook,
        teamJson.strDescriptionEN, teamJson.strColour1, teamJson.strColour2, teamJson.strColour3
    ];

    // for (const val of values) {
    //     console.log(val);
    // }

    try {
        const teamRes = await pool.query(query, values);
        teamID = teamRes.rows[0].t_id;
    } catch (err) {
        console.error(err);
        return;
    }

    try {
        await pool.query(
            `INSERT INTO team_leagues (team_id, league_id)
            VALUES ($1, $2)
            ON CONFLICT DO NOTHING;`,
            [teamID, leagueId]
        );
    } catch (err) {
        console.error(err);
        return;
    }
}

async function importLeague(leagueJson) {
    //Do not forget sport ID
    let sportID;
    if (leagueJson.strSport == "Soccer") {
        sportID = 3;
    }

    const query = `
        INSERT INTO leagues (l_api_id, l_name, l_name_alt, l_sport_id,
                                    l_curr_season, l_year_formed, l_gender, l_country,
                                    l_website, l_twitter, l_youtube, l_instagram, l_facebook,
                                    l_description, l_naming)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        ON CONFLICT (l_api_id)
        DO UPDATE SET
            l_name = EXCLUDED.l_name, l_name_alt = EXCLUDED.l_name_alt, l_curr_season = EXCLUDED.l_curr_season,
            l_year_formed = EXCLUDED.l_year_formed, l_gender = EXCLUDED.l_gender, l_country = EXCLUDED.l_country, 
            l_website = EXCLUDED.l_website, l_twitter = EXCLUDED.l_twitter, l_youtube = EXCLUDED.l_youtube, l_instagram = EXCLUDED.l_instagram, l_facebook = EXCLUDED.l_facebook,
            l_description = EXCLUDED.l_description, l_naming = EXCLUDED.l_naming
        RETURNING l_id;
    `;

    const values = [
        leagueJson.idLeague, leagueJson.strLeague, leagueJson.strLeagueAlternate, sportID,
        leagueJson.strCurrentSeason, leagueJson.intFormedYear, leagueJson.strGender, leagueJson.strCountry,
        leagueJson.strWebsite, leagueJson.strTwitter, leagueJson.strYoutube, leagueJson.strInstagram, leagueJson.strFacebook,
        leagueJson.strDescriptionEN, leagueJson.strNaming
    ];

    //console.log(leagueJson);

    // for (const val of values) {
    //     console.log(val);
    // }

    try {
        const teamRes = await pool.query(query, values);
        return teamRes.rows[0].l_id;
    } catch (err) {
        throw err;
        return null;
    }
}


//TODO: update to also create the league
//TODO: still in dev
async function importFullLeague(leagueApiId) {
    let teamsData, leagueID;

    try {
        const leagueData = await fetchLeagueJson(leagueApiId);
        leagueID = await importLeague(leagueData.leagues[0]);
    } catch (error) {
        leagueID = null;
        console.error(error);
    }
    console.log(leagueID);

    try {
        teamsData = await fetchLeagueTeams(leagueApiId);
    } catch (error) {
        teamsData = null;
        console.error(error);
    }
    //console.log(teamData);

    //importTeam(teamsData.teams[0], leagueID);

    for (let i = 0; i < teamsData.teams.length; i++) {
        importTeam(teamsData.teams[i], leagueID);
    }
}

async function main() {
    //importFullLeague(4356);

    const wswData = await fetchTeamJson(134480);
    const wpData = await fetchTeamJson(134475);

    await importTeam(wswData.teams[0], 6);
    await importTeam(wpData.teams[0], 6);

    // const data = await fetchLeagueJson(4356);
    // await importLeague(data.leagues[0]);

    // const data = await fetchTeamJson(134473);
    // const team = data.teams[0];

    // console.log("Team:");
    // console.log(team);

    // try {
    //     await importTeam(team, 5);
    // } catch (error) {
    //     console.error(error);
    // }

    // const result = await pool.query("SELECT * FROM teams;");
    // console.log(result.rows);
}

main().catch(console.error);