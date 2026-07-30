"use client";

import { useEffect, useState } from "react";
import { GamePanelSmall } from "@/app/components/games/gamePanels";
import { quantico } from "@/public/assets/fonts"; 
import Link from "next/link";

export default function Games() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/games")
        .then(res => res.json())
        .then(data => setGames(data));
    }, []);

    console.log(games);

    return (
        <div className="bg-slate-950 p-5">
            <div className="bg-gray-900 w-full rounded-lg p-6 shadow-md flex items-center">
                <h1 className="font-bold text-4xl ps-5">Games</h1>
            </div>

            <div className="bg-gray-900 w-4/5 mt-5 rounded-lg p-6 shadow-md">
                <h1 className="text-lg text-white font-bold">Scores</h1>
                <div className="flex flex-wrap gap-6 pt-5">
                    {games.map((game: any) => (
                        <GamePanelSmall key={game.g_id} game={game} />
                    ))}
                </div>

            </div>

            <div className="bg-gray-900 w-4/5 mt-5 rounded-lg p-6 shadow-md">
                <h1 className="text-lg text-white font-bold">Tables</h1>
            </div>
        </div>
);
}