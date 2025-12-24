import express from "express";
import "./jobs/cronJobs.js"

import usuariosRoutes from "./routes/usuariosRoutes.js";
import pesosRoutes from "./routes/pesosRoutes.js";
import habitosRoutes from "./routes/habitosRoutes.js";

const app = express();
app.use(express.json());

app.use("/usuarios", usuariosRoutes);
app.use("/usuarios", pesosRoutes);
app.use("/usuarios", habitosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});