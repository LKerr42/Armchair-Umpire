"use client";

import { useEffect, useState } from "react";
import { quantico } from "./components/fonts"; 

export default function Home() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/teams")
        .then(res => res.json())
        .then(data => setTeams(data));
    }, []);

    return (
    <main>
        <div className="bg-mauve-900 p-5">
            <h2 className={`${quantico.className} text-left font-bold underline text-4xl`}>
                Latest Scores
            </h2>
        </div>

        <div className="bg-mauve-900 p-5">
            <h2 className={`${quantico.className} text-left font-bold underline text-4xl`}>
                Trending News
            </h2>
        </div>

        <div className="bg-mauve-900 p-5">
            <h2 className={`${quantico.className} text-left font-bold underline text-4xl`}>
                Recommended For You
            </h2>

            {/* <p>{team.league_id}</p> */}
            {teams.map((team: any) => (
                <div key={team.id}>
                    <p>{team.short_name}</p>
                </div>
            ))}
            </div>
    </main>
);
}