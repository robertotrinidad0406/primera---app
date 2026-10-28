import Express = require ("express");
import type { Request, Response } from "express";
import estudiantesRouter = require("./routes/estudiantes");

const app = Express();
const PORT = 3000;
app.use(Express.json());
app.use("/api/estudiantes", estudiantesRouter);
interface Pedido {
  id: number;
  cliente: string;
  platillo: string;
  total: number;
  entregado: boolean;
}
const listaPedidos: Pedido[] = [
  {id: 1, cliente: "Teo Ibañez", platillo: "Hamburguesa", total: 45000,entregado: false,},
  {id: 2, cliente: "Martina Mendieta", platillo: "Pizza con piñazz", total: 65000, entregado: true,},
  {id: 3, cliente: "Maria Ruiz", platillo: "milanguiche de sanguinesa con exprimon limido", total: 35000, entregado: false,},
];
app.get("/api/pedidos", function (req: Request, res: Response) {
  res.status(200).json({
    ok: true,
    mensaje: "Lista de pedidos del restaurante",
    total: listaPedidos.length,
    data: listaPedidos,
  });
});
app.get("/api/pedidos/:id", function (req: Request, res: Response) {
  const idBuscado = Number(req.params.id);
  const pedidoEncontrado = listaPedidos.find(
    (p) => p.id === idBuscado
  );
  if (!pedidoEncontrado) {
    return res.status(404).json({
      ok: false,
      mensaje: `El pedido con ID ${idBuscado} no existe`,
    });
  }
  res.status(200).json({
    ok: true,
    data: pedidoEncontrado,
  });
});
app.post("/api/pedidos", function (req: Request, res: Response) {
  const { cliente, platillo, total, entregado } = req.body;
  const nuevoPedido: Pedido = {
    id: listaPedidos.length > 0
      ? Math.max(...listaPedidos.map((p) => p.id)) + 1
      : 1,
    cliente,
    platillo,
    total,
    entregado,
  };
  listaPedidos.push(nuevoPedido);
  res.status(201).json({
    ok: true,
    mensaje: "Pedido creado con éxito",
    data: nuevoPedido,
  });
});
app.put("/api/pedidos/:id", function (req: Request, res: Response) {
  const idBuscado = Number(req.params.id);
  const indice = listaPedidos.findIndex(
    (p) => p.id === idBuscado
  );
  if (indice === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: `El pedido con ID ${idBuscado} no existe`,
    });
  }
  const { cliente, platillo, total, entregado } = req.body;
  const pedidoActualizado: Pedido = {
    id: idBuscado,
    cliente,
    platillo,
    total,
    entregado,
  };
  listaPedidos[indice] = pedidoActualizado;
  res.status(200).json({
    ok: true,
    mensaje: "Pedido actualizado con éxito",
    data: pedidoActualizado,
  });
});
app.delete("/api/pedidos/:id", function (req: Request, res: Response) {
  const idBuscado = Number(req.params.id);
  const indice = listaPedidos.findIndex(
    (p) => p.id === idBuscado
  );
  if (indice === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: `El pedido con ID ${idBuscado} no existe`,
    });
  }
  const pedidoEliminado = listaPedidos.splice(indice, 1)[0];
  res.status(200).json({
    ok: true,
    mensaje: "Pedido cancelado con éxito",
    data: pedidoEliminado,
  });
});
app.listen(PORT, function () {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});