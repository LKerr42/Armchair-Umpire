"use client";

import { useEffect, useState } from "react";
import { quantico } from "@/public/assets/fonts"; 
import Link from "next/link";
import Image from "next/image";

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

            <div className="flex flex-wrap gap-6 pt-5">
                {teams.map((team: any) => (
                    <Link href={`/teams/${team.t_id}`} key={team.t_id} className="bg-gray-700 w-50 rounded-lg p-6 shadow-md text-center">
                        {/* <Image src="/assets/placeholder.png" alt="Placeholder crest" width={40} height={40} className="w-40" /> */}
                        <img src="/assets/placeholder.png" alt="Placeholder crest" className="w-40" />
                        <p className="pt-3">{team.t_name_alt}</p>
                    </Link>
                ))}
            </div>

        </div>
    </main>
);
}