import { useState } from "react";

export default function Confederation({
  teams,
  confederation,
  maxSelected,
  selectedTeams,
  updateSelectedTeams,
}) {
  const [errMsg, setErrMsg] = useState("");

  const handleCLick = (team) => {
    if (
      selectedTeams.filter((t) => t.confederacion === confederation).length >=
        maxSelected &&
      !selectedTeams.some((t) => t._id === team._id)
    ) {
      return setErrMsg(
        "No puedes seleccionar más equipos de esta confederación"
      );
    } else {
      setErrMsg("");
      updateSelectedTeams(confederation, team);
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
