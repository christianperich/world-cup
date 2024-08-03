import express from "express";
import Pais from "../models/Pais.js";
import Torneo from "../models/Torneo.js";
import Grupo from "../models/Grupo.js";
import Etapa from "../models/Etapas.js";
import Partido from "../models/Partidos.js";
import Statistics from "../models/Statistics.js";

const router = express.Router();

router.get("/teams", async (req, res) => {
  const teams = await Pais.find();

  res.json(teams);
});

router.get("/teams/:id", async (req, res) => {
  const { id } = req.params;

  const team = await Pais.findById(id);

  res.json(team);
});

router.post("/tournament", async (req, res) => {
  const { teams } = req.body;

  //Ordena los países por ranking de la FIFA y separa en 4 bombos
  const sortedTeams = teams.sort((b, a) => a.ranking - b.ranking);
  const bombo1 = sortedTeams.slice(0, 8);
  const bombo2 = sortedTeams.slice(8, 16);
  const bombo3 = sortedTeams.slice(16, 24);
  const bombo4 = sortedTeams.slice(24, 32);

  // Baraja los bombos
  const shuffledBombo1 = bombo1.sort(() => Math.random() - 0.5);
  const shuffledBombo2 = bombo2.sort(() => Math.random() - 0.5);
  const shuffledBombo3 = bombo3.sort(() => Math.random() - 0.5);
  const shuffledBombo4 = bombo4.sort(() => Math.random() - 0.5);

  // Crea los grupos
  const groups = [
    { name: "A", teams: [] },
    { name: "B", teams: [] },
    { name: "C", teams: [] },
    { name: "D", teams: [] },
    { name: "E", teams: [] },
    { name: "F", teams: [] },
    { name: "G", teams: [] },
    { name: "H", teams: [] },
  ];

  // Asigna los equipos a los grupos
  for (let i = 0; i < groups.length; i++) {
    groups[i].teams.push(shuffledBombo1[i]);
    groups[i].teams.push(shuffledBombo2[i]);
    groups[i].teams.push(shuffledBombo3[i]);
    groups[i].teams.push(shuffledBombo4[i]);
  }

  const createTournament = async () => {
    try {
      // Guarda los grupos en la base de datos
      const newGroups = await Grupo.insertMany(groups);

      // Crea los partidos de la fase de grupos
      const partidos = [];

      newGroups.forEach((group) => {
        partidos.push(
          {
            local: group.teams[0],
            visitor: group.teams[2],
            group: group._id,
            result: { local: 0, visitor: 0 },
          },
          {
            local: group.teams[1],
            visitor: group.teams[3],
            group: group._id,
            result: { local: 0, visitor: 0 },
          },
          {
            local: group.teams[1],
            visitor: group.teams[0],
            group: group._id,
            result: { local: 0, visitor: 0 },
          },
          {
            local: group.teams[3],
            visitor: group.teams[2],
            group: group._id,
            result: { local: 0, visitor: 0 },
          },
          {
            local: group.teams[3],
            visitor: group.teams[0],
            group: group._id,
            result: { local: 0, visitor: 0 },
          },
          {
            local: group.teams[1],
            visitor: group.teams[2],
            group: group._id,
            result: { local: 0, visitor: 0 },
          }
        );
      });

      const newPartidos = await Partido.insertMany(partidos);

      // Crea las etapas del torneo
      const newEtapa = new Etapa({
        faseGrupal: {
          partidos: newPartidos.map((partido) => partido),
        },
      });
      await newEtapa.save();

      // Crea el torneo
      const newTorneo = new Torneo({
        etapas: newEtapa,
        groups: newGroups,
        stats: [],
      });

      //Crea las estadistiscas de los equipos
      let stats = [];

      teams.forEach((team) => {
        stats.push({
          tournament: newTorneo._id,
          team: team._id,
          teamStats: {
            partidosJugados: 0,
            partidosGanados: 0,
            partidosEmpatados: 0,
            partidosPerdidos: 0,
            golesFavor: 0,
            golesContra: 0,
            diferenciaGoles: 0,
            puntos: 0,
          },
        });
      });

      const newStats = await Statistics.insertMany(stats);

      newTorneo.stats = newStats;

      const torneoID = await newTorneo.save().catch((err) => console.log(err));

      console.log(
        `El torneo fue creado exitosamente con el ID: ${torneoID._id}`
      );

      return res.status(201).json(newTorneo);
    } catch (err) {
      console.log(err);
    }
  };

  createTournament();
});

router.get("/tournament/:id/", async (req, res) => {
  const { id } = req.params;

  try {
    const tournament = await Torneo.findById(id).populate([
      { path: "groups", populate: { path: "teams" } },
      {
        path: "etapas",
        populate: {
          path: "faseGrupal.partidos",
          populate: [
            "local",
            "visitor",
            "group",
            { path: "group", select: "name" },
          ],
        },
      },
      { path: "stats", populate: { path: "team teamStats" } },
    ]);

    res.status(200).json(tournament);
  } catch (err) {
    console.log("No se pudo acceder al torneo.", err);
  }
});

router.put("/tournament/:id/partido/:idPartido", async (req, res) => {
  const { id, idPartido } = req.params;
  const partido = await Partido.findById(idPartido).populate([
    "local",
    "visitor",
  ]);

  const team1 = partido.local.ranking;
  const team2 = partido.visitor.ranking;

  // Simulación del partido

  const poisson = (lambda) => {
    let L = Math.exp(-lambda);
    let p = 1.5;
    let k = 0;

    do {
      k++;
      p *= Math.random();
    } while (p > L);

    return k - 1;
  };

  const calculateProbability = (team1, team2) => {
    let deltaR = team2 - team1;
    return 1 / (1 + Math.pow(10, deltaR / 400));
  };

  const simulateMatch = (team1, team2) => {
    let probabilityA = calculateProbability(team1, team2);
    let probabilityB = calculateProbability(team2, team1);

    let lambdaA = 2.5 * probabilityA;
    let lambdaB = 2 * probabilityB;

    let goalsA = poisson(lambdaA);
    let goalsB = poisson(lambdaB);

    return {
      goalsA,
      goalsB,
    };
  };

  const { goalsA, goalsB } = simulateMatch(team1, team2);

  // Actualiza el resultado del partido

  const partidoResult = {
    result: {
      local: goalsA,
      visitor: goalsB,
    },
    played: true,
  };

  const resultadoDelPartido = await Partido.findByIdAndUpdate(
    idPartido,
    partidoResult,
    { new: true }
  );

  // Actualiza las estadísticas de los equipos

  const localTeam = await Statistics.findOneAndUpdate(
    { tournament: id, team: partido.local._id },
    {
      $inc: {
        "teamStats.partidosJugados": 1,
        "teamStats.partidosGanados": goalsA > goalsB ? 1 : 0,
        "teamStats.partidosEmpatados": goalsA === goalsB ? 1 : 0,
        "teamStats.partidosPerdidos": goalsA < goalsB ? 1 : 0,
        "teamStats.golesFavor": goalsA,
        "teamStats.golesContra": goalsB,
        "teamStats.diferenciaGoles": goalsA - goalsB,
        "teamStats.puntos": goalsA > goalsB ? 3 : goalsA === goalsB ? 1 : 0,
      },
    },
    { new: true }
  ).populate("team");

  const visitorTeam = await Statistics.findOneAndUpdate(
    { tournament: id, team: partido.visitor._id },
    {
      $inc: {
        "teamStats.partidosJugados": 1,
        "teamStats.partidosGanados": goalsB > goalsA ? 1 : 0,
        "teamStats.partidosEmpatados": goalsB === goalsA ? 1 : 0,
        "teamStats.partidosPerdidos": goalsB < goalsA ? 1 : 0,
        "teamStats.golesFavor": goalsB,
        "teamStats.golesContra": goalsA,
        "teamStats.diferenciaGoles": goalsB - goalsA,
        "teamStats.puntos": goalsB > goalsA ? 3 : goalsB === goalsA ? 1 : 0,
      },
    },
    { new: true }
  ).populate("team");

  res.status(200).json({ resultadoDelPartido });
});

router.post("/add-teams", async (req, res) => {
  const paises = req.body;

  const newPaises = await Pais.insertMany(paises);

  res.json(newPaises);
});

router.get("/:idTorneo/:idTeam/stats", async (req, res) => {
  const { idTorneo, idTeam } = req.params;

  const data = req.body;

  const teamStats = await Statistics.findOne({
    tournament: idTorneo,
    team: idTeam,
  });
  res.json(teamStats);
});

export default router;
