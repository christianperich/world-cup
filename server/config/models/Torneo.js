import mongoose from "mongoose";

const TorneoSchema = new mongoose.Schema({
  groups: {
    name: {
      type: String,
      required: true,
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pais",
        required: true,
      },
    ],
  },
});

export default mongoose.model("Torneo", TorneoSchema);
