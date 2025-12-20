import express from "express";
import { insertarPesoController } from "../controllers/pesosController.js";

const route = express.Router();

route.post("/", insertarPesoController);

export default route;