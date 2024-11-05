import express from "express";
import cors from "cors";
import { patientRouter } from "./routes/patient.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", patientRouter);

app.listen(PORT, () => {
  console.log("server is running");
});
