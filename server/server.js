import express from "express";
import dotenv from "dotenv";
import router from "./config/routes/main.js";
import connectDB from "./config/db/db.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use(cors());

app.use("/", router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`http://localhost:${process.env.PORT || 3000}`);
});
