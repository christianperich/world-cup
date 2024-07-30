import express from "express";
import Pais from "../models/Pais.js";

const router = express.Router();

router.get("/teams", async (req, res) => {
  const teams = await Pais.find();

  res.json(teams);
});

router.get("/set-groups", async (req, res) => {
  const groups = await Confederacion.find();

  res.json(groups);
});

router.post("/set-groups", async (req, res) => {
  const teams = req.body;

  res.json(teams);
});

router.post("/add-teams", async (req, res) => {
  const paises = req.body;

  const newPaises = await Pais.insertMany(paises);

  res.json(newPaises);
});

export default router;
