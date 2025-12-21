import cron from "node-cron";
import { eliminarPesosAntiguos } from "../services/pesosService.js";

cron.schedule("0 0 * * *", async () => {
    console.log("Eliminado pesos antiguos ...");
    const filasEliminadas = await eliminarPesosAntiguos();
    console.log(`Cantidad de filas eliminadas ${filasEliminadas}`);
});