import { useEffect, useState, useContext } from "react";
import PlayButton from "./PlayButton";

export default function Match({ partido }) {
  const [local, setLocal] = useState();
  const [visitor, setVisitor] = useState();
  const [played, setPlayed] = useState(partido.played);

  useEffect(() => {
    setLocal(partido.result.local);
    setVisitor(partido.result.visitor);
  }, [partido.result]);

  const handleMatchPlayed = (result) => {
    setLocal(result.local);
    setVisitor(result.visitor);
    setPlayed(true);
  };

  return (
    <>
      <div>
        <div className="team-info">
          <p>{partido.local.nombre}</p>
          <p>{played ? local : ""}</p>
        </div>
        <div className="team-info">
          <p>{partido.visitor.nombre}</p>
          <p>{played ? visitor : ""}</p>
        </div>
      </div>
      <PlayButton partido={partido} onMatchPlayed={handleMatchPlayed} />
    </>
  );
}
