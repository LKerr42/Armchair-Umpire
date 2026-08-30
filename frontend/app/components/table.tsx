import Link from "next/link";

type tableProps = {
    tableElements: any | null;
};

export default function Table({
    tableElements,
}: tableProps) {
  return (
    <table className="w-full mt-2" style={{ borderCollapse: 'collapse' }}>
        <thead>
            <tr className="bg-gray-800 rounded-lg">
                <th>ID</th>
                <th>Name</th>
                <th>Points</th>
            </tr>
        </thead>
        <tbody>
            {tableElements.map((team: any, index: number) => (
            <tr key={team.ls_id} className="border-b border-white pb-2">
                <td>{index + 1}</td>
                <td><Link href={`/teams/${team.t_id}`} key={team.t_id}>{team.t_name}</Link></td>
                <td>{team.ls_points}</td>
            </tr>
            ))}
        </tbody>
    </table>
  );
}