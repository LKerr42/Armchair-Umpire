"use client";

import { useEffect, useState, use } from "react";

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
        fetch(url)
            .then(res => res.json())
            .then(data => setTeam(data));
    }, [id]);

    if (!team) return <p>Loading...</p>;

    return (
        <div className="bg-mauve-900 p-5">
            <h1>{team.name}</h1>
            <p>League: {team.league_id}</p>
        </div>
    );
}