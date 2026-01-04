import express from "express";
import "./jobs/cronJobs.js"

import { requireAuth } from "./middlewares/verificarToken.js";

import usuariosRoutes from "./routes/usuariosRoutes.js";
import pesosRoutes from "./routes/pesosRoutes.js";
import habitosRoutes from "./routes/habitosRoutes.js";
import historialHabitosRoutes from "./routes/historialHabitosRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

app.use("/usuarios", requireAuth, usuariosRoutes);
app.use("/usuarios", requireAuth, pesosRoutes);
app.use("/usuarios", requireAuth, habitosRoutes);
app.use("/usuarios", requireAuth, historialHabitosRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://192.168.1.5:${PORT}`);
});