import { useState } from "react";

export default function Confederation({ teams, confederation, maxSelected }) {
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const handleCLick = (team) => {
    if (selectedTeams.includes(team)) {
      setSelectedTeams(selectedTeams.filter((t) => t !== team));
    } else if (selectedTeams.length >= maxSelected) {
      return setErrMsg(
        "No puedes seleccionar más equipos de esta confederación"
      );
    } else {
      setSelectedTeams([...selectedTeams, team]);
    }
  };

  return (
    <>
      <h3>{confederation}</h3>
      <div className="team-selector">
        <p className="errMsg">{errMsg}</p>
        <div className="teams">
          {teams.map((team) => {
            if (team.confederacion == confederation) {
              return (
                <button
                  onClick={() => handleCLick(team)}
                  className={`team-btn ${
                    selectedTeams.includes(team) && "selected"
                  }`}
                  key={team._id}
                >
                  {team.nombre}
                </button>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </>
  );
}
