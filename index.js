import express from "express";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import pesosRoutes from "./routes/pesosRoutes.js";

const app = express();
app.use(express.json());

app.use("/usuarios", usuariosRoutes);
app.use("/usuarios/:id/pesos", pesosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en  http://localhost:${PORT}`);
});