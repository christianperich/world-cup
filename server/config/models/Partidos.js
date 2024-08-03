import mongoose from "mongoose";

const { Schema } = mongoose;

const matchSchema = new Schema({
  local: { type: Schema.Types.ObjectId, ref: "Pais" },
  visitor: { type: Schema.Types.ObjectId, ref: "Pais" },
  group: { type: Schema.Types.ObjectId, ref: "Grupo" },
  result: {
    local: { type: Number },
    visitor: { type: Number },
  },
  played: { type: Boolean, default: false },
});

export default mongoose.model("Partido", matchSchema);
