import mongoose from "mongoose";
const { Schema } = mongoose;

const tournamentSchema = new Schema({
  date: { type: Date, default: Date.now },
  groups: [{ type: Schema.Types.ObjectId, ref: "Grupo" }],
  etapas: { type: Schema.Types.ObjectId, ref: "Etapa" },
  stats: [{ type: Schema.Types.ObjectId, ref: "Statistics" }],
});

export default mongoose.model("Torneo", tournamentSchema);
