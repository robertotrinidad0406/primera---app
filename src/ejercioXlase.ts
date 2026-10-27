import Express = require ("express");
import type { Request, Response } from "express";

const app = Express();
const PORT = 3000;
app.use(Express.json());

interface Estudiante {
  id: number;
  nombre: string;
  curso: string;
  activo: boolean;
}

const listaEstudiantes: Estudiante[] = [
  { id: 1, nombre: "Carlos Mendoza", curso: "JavaScript", activo: true },
  { id: 2, nombre: "María López", curso: "TypeScript", activo: true },
  { id: 3, nombre: "Juan Pérez", curso: "React", activo: false },
  { id: 4, nombre: "Ana García", curso: "HTML y CSS", activo: true },
  { id: 5, nombre: "Luis Fernández", curso: "JavaScript", activo: false },
  { id: 6, nombre: "Sofía Ramírez", curso: "TypeScript", activo: true },
  { id: 7, nombre: "Diego Torres", curso: "React", activo: true },
  { id: 8, nombre: "Valentina Castro", curso: "Node.js", activo: false },
  { id: 9, nombre: "Andrés Flores", curso: "JavaScript", activo: true },
  { id: 10, nombre: "Camila Vargas", curso: "TypeScript", activo: false },
];
app.get("/api/estudiantes", function (req: Request, res: Response) {
  res.status(200).json({
    ok: true,
    mensaje: "Lista de estudiantes de funval",
    total: listaEstudiantes.length,
    data: listaEstudiantes,
  });
});

app.get("/api/estudiantes/:id", function (req: Request, res: Response) {
  const idBuscando = Number(req.params.id);
  const estudiantesEncontrado = listaEstudiantes.find(
    (e) => e.id === idBuscando,
  );
  if (!estudiantesEncontrado) {
    return res.status(404).json({
      ok: false,
      mensaje: `el estudiante con id ${idBuscando} NO EXISTE!!!`,
    });
  }
  res.status(200).json({
    ok: true,
    data: estudiantesEncontrado,
  });
});

app.post("/api/estudiantes", function (req: Request, res: Response) {
  const { nombre, curso, activo } = req.body;
    let nuevoEstudiante: Estudiante = {
    id: listaEstudiantes.length + 1,
    nombre,
    curso,
    activo,
  };
  listaEstudiantes.push(nuevoEstudiante);
  res.status(201).json({
    ok: true,
    mensaje: "estudiante registrado con exito",
    data: nuevoEstudiante,
  });
});

app.listen(PORT, function () {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});