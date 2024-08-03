import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/mainPage.css";
import Confederation from "../components/Confederation";

export default function MainPage() {
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function getTeams() {
      const response = await axios.get("api/teams");
      setTeams(response.data);
    }
    getTeams();
  }, []);

  const updateSelectedTeams = (confederation, team) => {
    setSelectedTeams((prevSelected) => {
      if (prevSelected.find((t) => t._id === team._id)) {
        return prevSelected.filter((t) => t._id !== team._id);
      } else {
        return [...prevSelected, team];
      }
    });
  };

  const handleClick = async () => {
    if (selectedTeams.length !== 32) {
      setErrMsg("Debes seleccionar 32 equipos");
      return;
    } else {
      setErrMsg("");
      const response = await axios.post("api/tournament", {
        teams: selectedTeams,
      });
      const newTournament = response.data._id;
      navigate(`/tournament/${newTournament}`);
    }
  };

  return (
    <>
      <div className="container">
        <div className="all-teams">
          <h1>Bienvenido a la copa del mundo</h1>
          <h2>Elige los países que van a participar</h2>

          <div className="teams">
            <Confederation
              teams={teams}
              confederation="CONMEBOL"
              maxSelected={5}
              selectedTeams={selectedTeams}
              updateSelectedTeams={updateSelectedTeams}
            />
            <Confederation
              teams={teams}
              confederation="UEFA"
              maxSelected={13}
              selectedTeams={selectedTeams}
              updateSelectedTeams={updateSelectedTeams}
            />
            <Confederation
              teams={teams}
              confederation="AFC"
              maxSelected={5}
              selectedTeams={selectedTeams}
              updateSelectedTeams={updateSelectedTeams}
            />
            <Confederation
              teams={teams}
              confederation="CONCACAF"
              maxSelected={4}
              selectedTeams={selectedTeams}
              updateSelectedTeams={updateSelectedTeams}
            />
            <Confederation
              teams={teams}
              confederation="CAF"
              maxSelected={5}
              selectedTeams={selectedTeams}
              updateSelectedTeams={updateSelectedTeams}
            />
          </div>
        </div>
        <div className="actions">
          <p className="errMsg">{errMsg}</p>
          <button onClick={handleClick} className="btn">
            Generar Torneo
          </button>
        </div>
      </div>
    </>
  );
}
