"use client";

import { useEffect, useState, use } from "react";
import { quantico } from "@/public/assets/fonts"; 

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
        <div className="bg-mauve-900 p-5">
            <div className="bg-gray-700 w-full rounded-lg p-6 shadow-md flex items-center">
                <img src="/assets/placeholder.png" alt="Placeholder crest" className="w-30" />
                <h1 className="font-bold text-4xl ps-5">{league.l_name}</h1>
            </div>

            <div className="w-4/5 mt-5 flex gap-6">
                <div className="bg-gray-600 w-2/3 rounded-lg p-6 shadow-md">
                    <p className="text-lg text-white text-bold">Matches</p>
                    <p className="text-base text-white">Latest</p>
                </div>

                <div className="bg-gray-600 w-1/2 rounded-lg p-6 shadow-md">
                    <p className="text-lg text-white text-bold">Table</p>
                    <p className="text-base text-white">{league.l_curr_season} Season</p>
                </div>
            </div>

            <div className="bg-gray-600 w-4/5 mt-5 rounded-lg p-6 shadow-md">
                <h1 className="text-lg text-white text-bold">About</h1>
                <p className="text-base text-white">{league.l_description}</p>
            </div>
        </div>
    );
}