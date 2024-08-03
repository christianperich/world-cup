import "../assets/css/partidos.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import GroupGames from "../components/GroupGames";
import GroupState from "../components/GroupState";
import { createContext } from "react";

export const TournamentContext = createContext();

export default function Play() {
  const [tournament, setTournament] = useState(null);
  const { id } = useParams();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const getTournament = async () => {
      const response = await axios.get(`/api/tournament/${id}`);
      setTournament(response.data);
    };

    getTournament();
  }, [id]);

  if (!tournament) {
    return <h4 className="container">Cargando...</h4>;
  }

  const handleClick = async () => {
    const stats = tournament.stats;
    do {
      const team = stats.find((team) => team.teamStats.partidosJugados < 3);
      if (team) {
        console.log(team);
        setErrMsg(
          `Se deben jugar todos los partidos de la fase de grupos antes de pasar a la siguiente ronda`
        );
        return;
      }
    } while (false);
    console.log("Todos los equipos han jugado 3 partidos");
  };

  return (
    <>
      <TournamentContext.Provider value={{ tournament, setTournament }}>
        <div className="container">
          <h1>Partidos</h1>

          {["A", "B", "C", "D", "E", "F", "G", "H"].map((group, index) => (
            <div className="first-round" key={index}>
              <GroupState setGroup={group} />
              <GroupGames setGroup={group} />
            </div>
          ))}
          <p className="errMsg">{errMsg}</p>
          <div className="actions">
            <button className="btn btn-primary" onClick={handleClick}>
              Siguiente Ronda
            </button>
          </div>
        </div>
      </TournamentContext.Provider>
    </>
  );
}
