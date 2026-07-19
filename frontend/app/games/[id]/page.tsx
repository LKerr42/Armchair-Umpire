"use client";

import { useEffect, useState, use } from "react";
import { quantico } from "@/public/assets/fonts"; 
import SocialLink from "@/app/components/socialLink";
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
                        <p className="text-lg text-white font-bold">Questions</p>

                        <div className="mt-5 w-full border-2 border-solid border-cyan-900 rounded-lg p-4">
                            <p className="text-lg text-white">Game?</p>
                            <p className="text-lg text-sky-200">Was a game</p>
                        </div>
                    </div>
                        
                </div>
                
                <div className="w-2/3">
                    <div className="bg-gray-900 w-full rounded-lg p-6 shadow-md">
                        <p className="text-lg text-sky-200">
                            <Link href={`/leagues/${game.league.l_id}`} 
                            className="text-sky-600 hover:text-sky-400 cursor-pointer transition-colors"
                            >{game.league.l_name} </Link>
                            - {timeStr}
                        </p>

                        <div className="flex justify-center p-5">
                            <div className="flex flex-col items-center text-center w-40 p-5">
                                <img src="/assets/placeholder.png" alt="Placeholder crest" className="w-9/10 mb-4" />
                                <p>{game.homeTeam.t_name}</p>
                            </div>
                            
                            <div className="flex justify-center items-center w-60">
                                <p className="w-20 text-center text-6xl" style={{ color: homeCol }}>
                                    {game.game.g_home_score} 
                                </p> 

                                <p className="w-20 text-center text-5xl text-gray-500 mx-7">
                                     - 
                                </p>
                                
                                <p className="w-20 text-center text-6xl" style={{ color: awayCol }}>
                                    {game.game.g_away_score} 
                                </p>  
                            </div>
                            
                            
                            <div className="flex flex-col items-center text-center w-40 p-5">
                                <img src="/assets/placeholder.png" alt="Placeholder crest" className="w-9/10 mb-4" />
                                <p>{game.awayTeam.t_name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}