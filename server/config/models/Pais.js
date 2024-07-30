import mongoose from "mongoose";

const PaisSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  confederacion: {
    type: String,
    required: true,
  },
  bandera: {
    type: String,
    required: true,
  },
  ranking: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Pais", PaisSchema);
