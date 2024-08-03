import { useState, useEffect, useContext } from "react";
import "../assets/css/partidos.css";
import axios from "axios";
import { TournamentContext } from "../pages/Play";

export default function PlayButton({ partido, onMatchPlayed }) {
  const [played, setPlayed] = useState(partido.played);
  const { tournament, setTournament } = useContext(TournamentContext);

  const handleClick = async () => {
    const data = await axios.put(
      `/api/tournament/${tournament._id}/partido/${partido._id}`
    );
    setPlayed(true);

    const result = data.data.resultadoDelPartido.result;

    const updatedTournament = await axios.get(
      `/api/tournament/${tournament._id}`
    );
    setTournament(updatedTournament.data);

    onMatchPlayed(result);
  };

  return (
    <>
      <button
        className={`btn-play ${played ? "disabled" : ""}`}
        onClick={handleClick}
      >
        {`${played ? "Jugado" : "Jugar"}`}
      </button>
    </>
  );
}
