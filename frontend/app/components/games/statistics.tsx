import Link from "next/link";

type statsDataProps = {
    game: any
    homeTeam: any
    awayTeam: any
}

export default function Statistics({
    game,
    homeTeam,
    awayTeam
}: statsDataProps) {
    return (
        <div className="text-center">
            <p className="text-lg text-white text-center font-bold mt-3">Top Statistics</p>
            <p className="text-lg text-white">Home team</p>
            <p className="text-lg text-sky-200">{homeTeam.t_name}</p>
            <p className="text-lg text-white">Away team</p>
            <p className="text-lg text-sky-200">{awayTeam.t_name}</p>
            <p className="text-lg text-white">Venue</p>
            <p className="text-lg text-sky-200">{game.g_venue}</p>
        </div>
    );
}