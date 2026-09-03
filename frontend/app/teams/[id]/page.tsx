"use client";

import { useEffect, useState, use } from "react";
import { quantico } from "@/public/assets/fonts"; 
import { GamePanelMedium, GamePanelTiny } from "@/app/components/games/gamePanels";
import Table from "@/app/components/table";
import SocialLink from "@/app/components/socialLink";
import Link from "next/link";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default function TeamPage({ params }: Props) {
    const { id } = use(params);
    const [team, setTeam] = useState<any>(null);

    const url = "http://localhost:5000/api/teams/" + id;

    useEffect(() => {
        async function loadTeam() {
            const response = await fetch(url);
            const data = await response.json();
            setTeam(data);
        }

        loadTeam();
    }, []);

    if (!team) return <p>Loading...</p>;

    console.log(team);

    return (
        <div className="bg-slate-950 p-5">
            <div className="bg-gray-900 w-full rounded-lg p-6 shadow-md flex items-center">
                <img src="/assets/placeholder.png" alt="Placeholder crest" className="w-30" />
                <h1 className="font-bold text-4xl ps-5">{team.team.t_name}</h1>
            </div>

            <div className="w-4/5 mt-5 flex gap-6">
                <div className="w-1/3">
                    <div className="bg-gray-900 w-full rounded-lg p-6 shadow-md">
                        <p className="text-lg text-white font-bold">Location</p>

                        <div className="mt-5 w-full border-2 border-solid border-cyan-900 rounded-lg p-4">
                            <p className="text-lg text-white">Home</p>
                            <Link href={`https:/en.wikipedia.org/wiki/${team.team.t_city}`} target="_blank" rel="noopener noreferrer"
                                className="text-lg text-sky-600 hover:text-sky-400 cursor-pointer transition-colors">{team.team.t_city}, {team.team.t_country}</Link>
                        </div>

                        <div className="mt-5 w-full border-2 border-solid border-cyan-900 rounded-lg p-4">
                            <p className="text-lg text-white">Stadium</p>
                            <Link href={`https://en.wikipedia.org/wiki/${team.team.t_stadium}`} target="_blank" rel="noopener noreferrer"
                                className="text-lg text-sky-600 hover:text-sky-400 cursor-pointer transition-colors">{team.team.t_stadium}</Link>
                        </div>
                    </div>

                    <div className="bg-gray-900 w-full rounded-lg p-6 shadow-md mt-5">
                        <p className="text-lg text-white font-bold">Info</p>

                        <div className="mt-5 w-full border-2 border-solid border-cyan-900 rounded-lg p-4">
                            <p className="text-lg text-white">Year formed</p>
                            <p className="text-lg text-sky-200">{team.team.t_year_formed}</p>
                        </div>

                        <div className="mt-5 w-full border-2 border-solid border-cyan-900 rounded-lg p-4">
                            <p className="text-lg text-white">Gender</p>
                            <p className="text-lg text-sky-200">{team.team.t_gender}</p>
                        </div>

                        <div className="mt-5 w-full border-2 border-solid border-cyan-900 rounded-lg p-4">
                            <p className="text-lg text-white">Colours</p>
                            <div className="flex mt-1">

                            {team.team.t_colour_3
                                ? 
                                <>
                                    <div className="w-1/3 h-5" style={{ backgroundColor: team.team.t_colour_1 }}></div>
                                    <div className="w-1/3 h-5" style={{ backgroundColor: team.team.t_colour_2 }}></div>
                                    <div className="w-1/3 h-5" style={{ backgroundColor: team.team.t_colour_3 }}></div>
                                </>
                                :
                                <>
                                    <div className="w-1/2 h-5" style={{ backgroundColor: team.team.t_colour_1 }}></div>
                                    <div className="w-1/2 h-5" style={{ backgroundColor: team.team.t_colour_2 }}></div>
                                </>
                            }
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 w-full rounded-lg p-6 shadow-md mt-5">
                        <p className="text-lg text-white font-bold">Socials</p>
                        
                        <SocialLink href={team.team.t_website} label="Website" />

                        <SocialLink href={team.team.t_twitter} label="Twitter" />

                        <SocialLink href={team.team.t_youtube} label="Youtube" />

                        <SocialLink href={team.team.t_instagram} label="Instagram" />

                        <SocialLink href={team.team.t_facebook} label="Facebook" />
                    </div>
                </div>
                
                <div className="w-2/3">
                    <div className="bg-gray-900 w-full rounded-lg p-6 shadow-md">
                        <p className="text-lg text-white font-bold">Matches</p>
                        <p className="text-base text-white">Latest</p>

                        <GamePanelMedium game={team.recentGames[0]} />
                    
                        <div className="flex flex-wrap justify-between gap-4 pt-5">
                            {team.recentGames
                                .slice(1)
                                .map((game: any) => (
                                <GamePanelTiny key={game.g_id} game={game} />
                            ))}
                        </div>
                    </div>

                    <div 
                        className="block bg-gray-900 w-full mt-5 rounded-lg p-6 shadow-md"
                            >
                        <p className="text-lg text-white font-bold">Table</p>
                        <Link href={`/leagues/${team.team.l_id}`} key={team.team.l_id}
                                className="text-lg text-sky-500 hover:text-sky-300 cursor-pointer transition-colors">{team.team.l_name} &gt;</Link>

                        <Table tableElements={team.table} teamID={team.team.t_id} />
                    </div>

                    <div className="bg-gray-900 w-full mt-5 rounded-lg p-6 shadow-md">
                        <h1 className="text-lg text-white font-bold">About</h1>
                        <p className="text-base text-white">{team.team.t_description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}