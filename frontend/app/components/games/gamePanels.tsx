import Link from "next/link";
import EmbeddedVideo from "@/app/components/games/embeddedVideo";
import { quantico } from "@/public/assets/fonts"; 

type gameProps = {
    game: any
};

function formatTime(startTime: any, yearF: any, monthF: any, dayF: any) {
    const timeStamp = new Date(startTime);
    return timeStamp.toLocaleDateString('en-US', {
        year: yearF,
        month: monthF,
        day: dayF
    });
}

function getScoreColours(game: any) {
    if (game.g_home_score > game.g_away_score) { //home wins
        return {
            homeCol: "#7dd3fc", //winner
            awayCol: "#f0f9ff"
        }
    } else if (game.g_home_score < game.g_away_score) { //away wins
        return {
            awayCol: "#7dd3fc", //winner
            homeCol: "#f0f9ff"
        }
    } else { //tie
        return {
            homeCol: "#bae6fd",
            awayCol: "#bae6fd"
        }
    }
}

function calculateRound(round: String) {
    var roundInt = Number(round)
    if (roundInt == 160) {
        return "Elimination Final";
    } else if (roundInt == 150) {
        return "Semi Final";
    } else if (roundInt == 200) {
        return "Final";
    } else {
        return "Round " + round;
    }
}

export function GamePanelLarge({
    game
}: gameProps) {
    const {homeCol, awayCol} = getScoreColours(game.game);

    return (
        <div className="bg-gray-900 w-full rounded-lg p-6 shadow-md">
            <p className="text-lg">
                <Link href={`/leagues/${game.league.l_id}`} 
                className="text-sky-600 hover:text-sky-400 cursor-pointer transition-colors"
                >{game.league.l_name} </Link>
                - {formatTime(game.game.g_start_time, 'numeric', 'long', 'numeric')}
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
    );
}

export function GamePanelSmall({
    game
}: gameProps) {
    const {homeCol, awayCol} = getScoreColours(game);
    return (
        <Link href={`/games/${game.g_id}`} className="bg-gray-800 w-65 h-35 rounded-lg px-4 pb-2 shadow-md text-left hover:bg-gray-700 transition-colors">
            <p className="text-sm pt-2">{game.l_name} - {calculateRound(game.g_round)}</p> 
            
            <div className="flex items-center h-7 pt-2"> 
                <img src="/assets/placeholder.png" alt="Placeholder crest" className="w-5" /> 
                <p className="flex-1 min-w-0 pl-2 truncate pl-2 text-white">{game.home_t_name}</p> 
                <p className="pl-2" style={{ color: homeCol }}>{game.g_home_score}</p> 
            </div> 
            <div className="flex items-center h-7 pt-2"> 
                <img src="/assets/placeholder.png" alt="Placeholder crest" className="w-5" /> 
                <p className="flex-1 min-w-0 pl-2 truncate pl-2 text-white">{game.away_t_name}</p> 
                <p className="pl-2" style={{ color: awayCol }}>{game.g_away_score}</p> 
            </div>

            <p className="text-sm text-gray-400 pt-2">{game.g_status} - {formatTime(game.g_start_time, '2-digit', 'short', 'numeric')}</p>
        </Link>  
    );
}