import Link from "next/link";

type tableProps = {
    tableElements: any | null,
    teamID: number;
};

export default function Table({
    tableElements,
    teamID
}: tableProps) {
  return (
    <table className="w-full mt-2" style={{ borderCollapse: 'collapse' }}>
        <thead>
            <tr className="bg-gray-800 rounded-lg text-left">
                <th>Pos.</th>
                <th>Club</th>
                <th>MP</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th>Pts.</th>
            </tr>
        </thead>
        <tbody>
            {tableElements.map((team: any, index: number) => (
            <tr key={team.ls_id} className={`border-b border-white pb-2 ${
                    teamID == team.ls_team_id 
                        ? "bg-gray-700"
                        : ""
                }`}>

                <td>{index + 1}</td>
                <td><Link href={`/teams/${team.t_id}`} key={team.t_id}>{team.t_name}</Link></td>
                <td>{team.ls_played}</td>
                <td>{team.ls_won}</td>
                <td>{team.ls_drawn}</td>
                <td>{team.ls_lost}</td>
                <td>{team.ls_goals_for}</td>
                <td>{team.ls_goals_against}</td>
                <td>{team.ls_goals_difference}</td>
                <td>{team.ls_points}</td>
            </tr>
            ))}
        </tbody>
    </table>
  );
}