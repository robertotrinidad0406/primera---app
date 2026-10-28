import Express = require("express");
import type { Request, Response } from "express";
import estudiantesRouter = require("./routes/estudiantes");

const app = Express();
const PORT = 3000;
app.use(Express.json());
app.use("/api/estudiantes", estudiantesRouter);

app.listen(PORT, function () {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});