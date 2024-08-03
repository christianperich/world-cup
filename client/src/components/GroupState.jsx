import TeamStats from "./TeamStats";
import { useEffect, useState, useContext } from "react";
import { TournamentContext } from "../pages/Play";

export default function GroupState({ setGroup }) {
  const { tournament, setTournament } = useContext(TournamentContext);

  if (!tournament) return <h1>Cargando...</h1>;

  const getTeamStats = (teamId, stats) => {
    const teamStats = stats.find((stat) => stat.team._id === teamId);
    return teamStats ? teamStats.teamStats : null;
  };

  const sortedGroups = tournament.groups.map((group) => {
    const teamsWithStats = group.teams.map((team) => {
      const teamStats = getTeamStats(team._id, tournament.stats);
      return { ...team, ...teamStats };
    });

    const sortedByGoalDifference = teamsWithStats.sort(
      (a, b) => b.diferenciaGoles - a.diferenciaGoles
    );
    const sortedTeams = teamsWithStats.sort((a, b) => b.puntos - a.puntos);
    console.log(sortedTeams);
    return { ...group, teams: sortedTeams };
  });

  return (
    <>
      <div className="container">
        <h1>Grupo {setGroup}</h1>
        <table className="positionsTable">
          <thead>
            <tr>
              <th>Equipo</th>
              <th>PJ</th>
              <th>PG</th>
              <th>PE</th>
              <th>PP</th>
              <th>GF</th>
              <th>GC</th>
              <th>DG</th>
              <th>PTS</th>
            </tr>
          </thead>
          <tbody>
            {sortedGroups
              .filter((group) => group.name === setGroup)
              .map((group) =>
                group.teams.map((team) => (
                  <tr key={team._id}>
                    <TeamStats team={team} />
                  </tr>
                ))
              )}
          </tbody>
        </table>
      </div>
    </>
  );
}
