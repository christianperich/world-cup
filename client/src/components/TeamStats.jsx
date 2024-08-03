import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../assets/css/partidos.css";
import { TournamentContext } from "../pages/Play";
import "../assets/css/partidos.css";

export default function TeamStats({ team }) {
  const { tournament, setTournament } = useContext(TournamentContext);

  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [gamesWon, setGamesWon] = useState(0);
  const [gamesDrawn, setGamesDrawn] = useState(0);
  const [gamesLost, setGamesLost] = useState(0);
  const [goalsFor, setGoalsFor] = useState(0);
  const [goalsAgainst, setGoalsAgainst] = useState(0);
  const [goalDifference, setGoalDifference] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const getTeamStats = async () => {
      const response = await axios.get(
        `/api/${tournament._id}/${team._id}/stats`
      );
      const teamStats = response.data.teamStats;
      setGamesPlayed(teamStats.partidosJugados);
      setGamesWon(teamStats.partidosGanados);
      setGamesDrawn(teamStats.partidosEmpatados);
      setGamesLost(teamStats.partidosPerdidos);
      setGoalsFor(teamStats.golesFavor);
      setGoalsAgainst(teamStats.golesContra);
      setGoalDifference(teamStats.diferenciaGoles);
      setPoints(teamStats.puntos);
    };

    getTeamStats();
  });

  return (
    <>
      <td className="team-name">{team.nombre}</td>
      <td>{gamesPlayed}</td>
      <td>{gamesWon}</td>
      <td>{gamesDrawn}</td>
      <td>{gamesLost}</td>
      <td>{goalsFor}</td>
      <td>{goalsAgainst}</td>
      <td>{goalDifference}</td>
      <td>{points}</td>
    </>
  );
}
