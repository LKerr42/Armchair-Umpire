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

export default function LeaguePage({ params }: Props) {
    const { id } = use(params);
    const [league, setLeague] = useState<any>(null);

    const url = "http://localhost:5000/api/leagues/" + id;

    useEffect(() => {
        async function loadLeague() {
            const response = await fetch(url);
            const data = await response.json();
            setLeague(data);
        }

        loadLeague();
    }, []);

    if (!league) return <p>Loading...</p>;

    return (
        <div className="bg-slate-950 p-5">
            <div className="bg-gray-900 w-full rounded-lg p-6 shadow-md flex items-center">
                <img src="/assets/placeholder.png" alt="Placeholder crest" className="w-30" />
                <h1 className="font-bold text-4xl ps-5">{league.l_name}</h1>
            </div>

            <div className="w-4/5 mt-5 flex gap-6">
                <div className="w-1/3">
                    <div className="bg-gray-900 w-full rounded-lg p-6 shadow-md">
                        <p className="text-lg text-white font-bold">Location</p>

                        <div className="mt-5 w-full border-2 border-solid border-cyan-900 rounded-lg p-4">
                            <p className="text-lg text-white">Country</p>
                            <Link href={`https:/en.wikipedia.org/wiki/${league.l_country}`} target="_blank" rel="noopener noreferrer"
                                className="text-lg text-sky-600 hover:text-sky-400 cursor-pointer transition-colors">{league.l_country}</Link>
                        </div>
                    </div>

                    <div className="bg-gray-900 w-full rounded-lg p-6 shadow-md mt-5">
                        <p className="text-lg text-white font-bold">Info</p>

                        <div className="mt-5 w-full border-2 border-solid border-cyan-900 rounded-lg p-4">
                            <p className="text-lg text-white">Year formed</p>
                            <p className="text-lg text-sky-200">{league.l_year_formed}</p>
                        </div>

                        <div className="mt-5 w-full border-2 border-solid border-cyan-900 rounded-lg p-4">
                            <p className="text-lg text-white">Gender</p>
                            <p className="text-lg text-sky-200">{league.l_gender}</p>
                        </div>
                    </div>

                    <div className="bg-gray-900 w-full rounded-lg p-6 shadow-md mt-5">
                        <p className="text-lg text-white font-bold">Socials</p>

                        <SocialLink href={league.l_website} label="Website" />

                        <SocialLink href={league.l_twitter} label="Twitter" />

                        <SocialLink href={league.l_youtube} label="Youtube" />

                        <SocialLink href={league.l_instagram} label="Instagram" />

                        <SocialLink href={league.l_facebook} label="Facebook" />
                    </div>
                </div>
                
                <div className="w-2/3">
                    <div className="bg-gray-900 w-full rounded-lg p-6 shadow-md">
                        <p className="text-lg text-white font-bold">Matches</p>
                        <p className="text-base text-white">Latest</p>
                    </div>

                    <div className="bg-gray-900 w-full mt-5 rounded-lg p-6 shadow-md">
                        <p className="text-lg text-white font-bold">Table</p>
                        <p className="text-base text-white">{league.l_curr_season} Season</p>
                    </div>

                    <div className="bg-gray-900 w-full mt-5 rounded-lg p-6 shadow-md">
                        <h1 className="text-lg text-white font-bold">About</h1>
                        <p className="text-base text-white">{league.l_description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}