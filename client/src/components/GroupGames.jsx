import Match from "./Match";
import { useContext } from "react";
import { TournamentContext } from "../pages/Play";

export default function GroupGames({ setGroup }) {
  const { tournament, setTournament } = useContext(TournamentContext);

  const partidos = tournament.etapas.faseGrupal.partidos;

  return (
    <>
      <section className="partidos ">
        {partidos
          .filter((partido) => partido.group.name == setGroup)
          .map((partido) => (
            <div key={partido._id} className="partido-card">
              <Match partido={partido} />
            </div>
          ))}
      </section>
    </>
  );
}
