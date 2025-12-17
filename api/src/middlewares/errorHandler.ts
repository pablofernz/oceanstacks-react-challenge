import { NextFunction, Request, Response } from "express";

// Middleware global para captura de errores no manejados.
// Firma estándar de Express con 4 parámetros: (err, req, res, next).
// Responde 500 con un objeto { error: message }.
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const message = err instanceof Error ? err.message : "Internal Server Error";
  res.status(500).json({ error: message });
}
