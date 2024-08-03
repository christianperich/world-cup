import mongoose from "mongoose";
const { Schema } = mongoose;

const statisticsSchema = new Schema([
  {
    tournament: {
      type: Schema.Types.ObjectId,
      ref: "Torneo",
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Pais",
    },
    teamStats: {
      partidosJugados: { type: Number, default: 0 },
      partidosGanados: { type: Number, default: 0 },
      partidosEmpatados: { type: Number, default: 0 },
      partidosPerdidos: { type: Number, default: 0 },
      golesFavor: { type: Number, default: 0 },
      golesContra: { type: Number, default: 0 },
      diferenciaGoles: { type: Number, default: 0 },
      puntos: { type: Number, default: 0 },
    },
  },
]);

export default mongoose.model("Statistics", statisticsSchema);
