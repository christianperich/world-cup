import mongoose from "mongoose";
const { Schema } = mongoose;

const groupSchema = new Schema({
  name: { type: String, required: true },
  teams: [{ type: Schema.Types.ObjectId, ref: "Pais" }],
});

export default mongoose.model("Grupo", groupSchema);
