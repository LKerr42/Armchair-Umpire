"use client";

import { useEffect, useState, use } from "react";
import { quantico } from "@/public/assets/fonts"; 
import EmbeddedVideo from "@/app/components/games/embeddedVideo";
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
    const [selectedTab, setSelectedTab] = useState("lineups");

    const tabs = [  
        "Lineups",
        "Stats"
    ]

    if (!game) return <p>Loading...</p>;

    console.log(game);

    //decode time
    const timeStamp = new Date(game.game.g_start_time);
    const timeStr = timeStamp.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    var homeCol, awayCol;
    if (game.game.g_home_score > game.game.g_away_score) { //home wins
        homeCol = "#00bcff"; //winner
        awayCol = "#b8e6fe";
    } else if (game.game.g_home_score < game.game.g_away_score) { //away wins
        awayCol = "#00bcff"; //winner
        homeCol = "#b8e6fe";
    } else { //tie
        homeCol = awayCol = "#74d4ff";
    }

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
                    <div className="bg-gray-900 w-full rounded-lg p-6 shadow-md">
                        <p className="text-lg">
                            <Link href={`/leagues/${game.league.l_id}`} 
                            className="text-sky-600 hover:text-sky-400 cursor-pointer transition-colors"
                            >{game.league.l_name} </Link>
                            - {timeStr}
                        </p>

                        <div className="flex justify-center p-5">
                            <div className="flex flex-col items-center text-center w-full p-5">
                                <img src="/assets/placeholder.png" alt="Placeholder crest" className="w-30 mb-4" />
                                <p>{game.homeTeam.t_name}</p>
                            </div>
                            
                            <div className={`${quantico.className} flex justify-center items-center w-60`}>
                                <div className="w-20 text-center text-6xl" style={{ color: homeCol }}>
                                    <p>{game.game.g_home_score}</p>
                                </div> 

                                <div className="w-20 text-center text-5xl text-gray-500 mx-7">
                                    <p className="pt-12">-</p>
                                    <p className="pt-5 text-xl">{game.game.g_status}</p>
                                </div>
                                
                                <div className="w-20 text-center text-6xl" style={{ color: awayCol }}>
                                    <p>{game.game.g_away_score}</p>
                                </div>  
                            </div>
                            
                            <div className="flex flex-col items-center text-center w-full p-5">
                                <img src="/assets/placeholder.png" alt="Placeholder crest" className="w-30 mb-4" />
                                <p>{game.awayTeam.t_name}</p>
                            </div>
                        </div>

                        <EmbeddedVideo href={game.game.g_video} />

                    </div>

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