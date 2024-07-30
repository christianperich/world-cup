import axios from "axios";
import { useEffect, useState } from "react";
import "../assets/css/mainPage.css";
import Confederation from "../components/Confederation";

export default function MainPage() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function getTeams() {
      const response = await axios.get("api/teams");
      setTeams(response.data);
    }
    getTeams();
  }, []);

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
            />
            <Confederation
              teams={teams}
              confederation="UEFA"
              maxSelected={13}
            />
            <Confederation teams={teams} confederation="AFC" maxSelected={5} />
            <Confederation
              teams={teams}
              confederation="CONCACAF"
              maxSelected={4}
            />
            <Confederation teams={teams} confederation="CAF" maxSelected={5} />
          </div>
        </div>
        <button>Generar Torneo</button>
      </div>
    </>
  );
}
