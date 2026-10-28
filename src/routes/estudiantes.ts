import Express = require("express");
import type { Request, Response } from "express";

const router = Express.Router();

interface Estudiante {
  id: number;
  nombre: string;
  curso: string;
  activo: boolean;
  bootcamp?: string;
}

const listaEstudiantes: Estudiante[] = [
  {
    id: 1,
    nombre: "Carlos Mendoza",
    curso: "JavaScript",
    activo: true,
    bootcamp: "Frontend",
  },
  { id: 2, nombre: "María López", curso: "TypeScript", activo: true },
  {
    id: 3,
    nombre: "Juan Pérez",
    curso: "React",
    activo: false,
    bootcamp: "Frontend",
  },
  {
    id: 4,
    nombre: "Ana García",
    curso: "HTML y CSS",
    activo: true,
    bootcamp: "Frontend",
  },
  {
    id: 5,
    nombre: "Luis Fernández",
    curso: "JavaScript",
    activo: false,
    bootcamp: "Frontend",
  },
  { id: 6, nombre: "Sofía Ramírez", curso: "TypeScript", activo: true },
  {
    id: 7,
    nombre: "Diego Torres",
    curso: "React",
    activo: true,
    bootcamp: "Frontend",
  },
  { id: 8, nombre: "Valentina Castro", curso: "Node.js", activo: false },
  {
    id: 9,
    nombre: "Andrés Flores",
    curso: "JavaScript",
    activo: true,
    bootcamp: "Frontend",
  },
  { id: 10, nombre: "Camila Vargas", curso: "TypeScript", activo: false },
];

router.get("/", function (req: Request, res: Response) {
  const { bootcamp } = req.query;

  if (bootcamp !== undefined && typeof bootcamp !== "string") {
    return res.status(400).json({
      ok: false,
      mensaje: "El parámetro bootcamp debe ser un texto",
    });
  }

  const estudiantes = typeof bootcamp === "string"
    ? listaEstudiantes.filter((estudiante) => estudiante.bootcamp === bootcamp)
    : listaEstudiantes;

  res.status(200).json({
    ok: true,
    mensaje: "Lista de estudiantes de funval",
    total: estudiantes.length,
    data: estudiantes,
  });
});

router.get("/:id", function (req: Request, res: Response) {
  const idBuscando = Number(req.params.id);
  const estudianteEncontrado = listaEstudiantes.find(
    (estudiante) => estudiante.id === idBuscando,
  );

  if (!estudianteEncontrado) {
    return res.status(404).json({
      ok: false,
      mensaje: `el estudiante con id ${idBuscando} NO EXISTE!!!`,
    });
  }

  res.status(200).json({
    ok: true,
    data: estudianteEncontrado,
  });
});

router.post("/", function (req: Request, res: Response) {
  const { nombre, curso, activo, bootcamp } = req.body;
  const nuevoEstudiante: Estudiante = {
    id: listaEstudiantes.length + 1,
    nombre,
    curso,
    activo,
    ...(typeof bootcamp === "string" ? { bootcamp } : {}),
  };

  listaEstudiantes.push(nuevoEstudiante);
  res.status(201).json({
    ok: true,
    mensaje: "estudiante registrado con exito",
    data: nuevoEstudiante,
  });
});

export = router;
