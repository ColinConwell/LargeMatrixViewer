import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMatrixSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  app.get("/api/matrices", async (_req, res) => {
    const matrices = await storage.listMatrices();
    res.json(matrices);
  });

  app.get("/api/matrices/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const matrix = await storage.getMatrix(id);
    if (!matrix) {
      res.status(404).json({ message: "Matrix not found" });
      return;
    }
    res.json(matrix);
  });

  app.post("/api/matrices", async (req, res) => {
    const result = insertMatrixSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid matrix data" });
      return;
    }
    const matrix = await storage.createMatrix(result.data);
    res.json(matrix);
  });

  const httpServer = createServer(app);
  return httpServer;
}
