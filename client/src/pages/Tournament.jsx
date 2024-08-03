import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/css/tournament.css";

export default function Tournament() {
  const [groups, setGroups] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch(`/api/tournament/${id}`);
      const data = await response.json();
      setGroups(data.groups);
    };
    fetchGroups();
  }, [id]);

  return (
    <>
      <div className="container">
        <h1>Copa Mundial</h1>
        <h2>Grupos</h2>
        <div className="cards">
          {groups.map((group, index) => (
            <div className="group-card" key={index}>
              <h3 className="group-header">Grupo {group.name}</h3>
              <div className="group-teams">
                {group.teams.map((team, index) => (
                  <img key={index} src={team.bandera} alt={team.nombre} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <a href={`/tournament/${id}/jugar`} className="btn btn-block">
          Jugar
        </a>
      </div>
    </>
  );
}
