import { Router } from "express";
import type { Request, Response } from "express";
const router = Router();
interface Estudiante {
  id: number;
  nombre: string;
  curso: string;
  activo: boolean;
  bootcamp?: string;
}
const listaEstudiantes: Estudiante[] = [
  { id: 1, nombre: "Carlos Mendoza", curso: "JavaScript", activo: true, bootcamp: "Frontend" },
  { id: 2, nombre: "María López", curso: "TypeScript", activo: true },
  { id: 3, nombre: "Juan Pérez", curso: "React", activo: false, bootcamp: "Frontend" },
  { id: 4, nombre: "Ana García", curso: "HTML y CSS", activo: true, bootcamp: "Frontend" },
  { id: 5, nombre: "Luis Fernández", curso: "JavaScript", activo: false, bootcamp: "Frontend" },
  { id: 6, nombre: "Sofía Ramírez", curso: "TypeScript", activo: true },
  { id: 7, nombre: "Diego Torres", curso: "React", activo: true, bootcamp: "Frontend" },
  { id: 8, nombre: "Valentina Castro", curso: "Node.js", activo: false },
  { id: 9, nombre: "Andrés Flores", curso: "JavaScript", activo: true, bootcamp: "Frontend" },
  { id: 10, nombre: "Camila Vargas", curso: "TypeScript", activo: false },
];
router.get("/", (req: Request, res: Response) => {
  const { bootcamp } = req.query;
  if (bootcamp !== undefined && typeof bootcamp !== "string") {
    return res.status(400).json({
      ok: false,
      mensaje: "El parámetro bootcamp debe ser un texto",
    });
  }
  const estudiantes =
    typeof bootcamp === "string"
      ? listaEstudiantes.filter(
          (estudiante) => estudiante.bootcamp === bootcamp
        )
      : listaEstudiantes;
  return res.status(200).json({
    ok: true,
    mensaje: "Lista de estudiantes de Funval",
    total: estudiantes.length,
    data: estudiantes,
  });
});
router.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const estudiante = listaEstudiantes.find(
    (estudiante) => estudiante.id === id
  );
  if (!estudiante) {
    return res.status(404).json({
      ok: false,
      mensaje: `El estudiante con ID ${id} no existe`,
    });
  }
  return res.status(200).json({
    ok: true,
    data: estudiante,
  });
});
router.post("/", (req: Request, res: Response) => {
  const { nombre, curso, activo, bootcamp } = req.body;
  const nuevoEstudiante: Estudiante = {
    id: listaEstudiantes.length
      ? Math.max(...listaEstudiantes.map((e) => e.id)) + 1
      : 1,
    nombre,
    curso,
    activo,
    ...(typeof bootcamp === "string" ? { bootcamp } : {}), /*un termino que la IA me recomendo, estare investigando de que va*/
  };
  listaEstudiantes.push(nuevoEstudiante);
  return res.status(201).json({
    ok: true,
    mensaje: "Estudiante registrado con éxito",
    data: nuevoEstudiante,
  });
});
export default router;
