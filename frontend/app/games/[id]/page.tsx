"use client";

import { useEffect, useState, use } from "react";
import { quantico } from "@/public/assets/fonts"; 
import { GamePanelLarge } from "@/app/components/games/gamePanels";
import Statistics from "@/app/components/games/statistics";
import Link from "next/link";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default function GamePage({ params }: Props) {
    const { id } = use(params);
    const [game, setGame] = useState<any>(null);

    const url = "http://localhost:5000/api/games/" + id;

    useEffect(() => {
        async function loadGame() {
            const response = await fetch(url);
            const data = await response.json();
            setGame(data);
        }

        loadGame();
    }, []);

    //setup state for lineups/stats
    const [selectedTab, setSelectedTab] = useState("Stats");

    const tabs = [  
        "Timeline",
        "Lineups",
        "Stats"
    ]

    if (!game) return <p>Loading...</p>;

    console.log(game);

    return (
        <div className="bg-slate-950 p-5">  
            <div className="w-4/5 mt-5 flex gap-6">
                <div className="w-1/3">
                    <div className="bg-gray-900 w-full rounded-lg p-6 shadow-md">
                        {/* <p className="text-lg text-white font-bold">Stats</p> */}

                        <div className="mt-5 w-full border-2 border-solid border-cyan-900 rounded-lg p-4">
                            <p className="text-lg text-white">Venue</p>
                            <Link href={`https://en.wikipedia.org/wiki/${game.game.g_venue}`} target="_blank" rel="noopener noreferrer"
                                className="text-lg text-sky-600 hover:text-sky-400 cursor-pointer transition-colors">{game.game.g_venue}</Link>
                        </div>
                    </div>
                        
                </div>
                
                <div className="w-2/3">
                    <GamePanelLarge game={game} />

                    <div className="bg-gray-900 w-full mt-5 rounded-lg p-6 shadow-md">
                        <div className="flex border-b border-slate-700">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setSelectedTab(tab)}
                                    className={
                                        selectedTab === tab
                                            ? "px-4 py-2 bg-slate-800 border-b border-slate-400 cursor-pointer"
                                            : "px-4 py-2 hover:bg-slate-600 transition cursor-pointer"
                                    }
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {selectedTab === "Timeline" && (
                            <p className="text-lg text-white text-center font-bold mt-3">Timeline</p>
                        )}

                        {selectedTab === "Stats" && (
                            <Statistics game={game.game} homeTeam={game.homeTeam} awayTeam={game.awayTeam} />
                        )}

                        {selectedTab === "Lineups" && (
                            <p className="text-lg text-white text-center font-bold mt-3">Lineups</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}