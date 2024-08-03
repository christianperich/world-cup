import mongoose from "mongoose";

const { Schema } = mongoose;

const stageSchema = new Schema({
  faseGrupal: {
    partidos: [{ type: Schema.Types.ObjectId, ref: "Partido" }],
  },
  faseEliminatoria: {
    partidos: [{ type: Schema.Types.ObjectId, ref: "Partido" }],
  },
});

export default mongoose.model("Etapa", stageSchema);
