import cron from "node-cron";
import { eliminarPesosAntiguos } from "../services/pesosService.js";
import { crearHistorialHabitosDeHoy, eliminarHistorialAntiguo } from "../services/historialHabitosService.js";

cron.schedule("0 0 * * *", async () => {

    try {
        console.log("Creando historial de hábitos para el día de hoy...");
        const historialNuevo = await crearHistorialHabitosDeHoy();
        console.log(`Cantidad de historial nuevo: ${historialNuevo}.`);
    } catch (err) {
        console.error("Error al crear historial de hábitos:", err);
    }

    try {
        console.log("Eliminando pesos antiguos...");
        const filasEliminadas = await eliminarPesosAntiguos();
        console.log(`Cantidad de filas eliminadas: ${filasEliminadas}.`);
    } catch (err) {
        console.error("Error al eliminar pesos antiguos:", err);
    }

    try {
        console.log("Eliminando historial antiguo de los hábitos...");
        const historialEliminado = await eliminarHistorialAntiguo();
        console.log(`Cantidad de historial eliminado: ${historialEliminado}.`);
    } catch (err) {
        console.error("Error al eliminar historial antiguo:", err);
    }
   
});