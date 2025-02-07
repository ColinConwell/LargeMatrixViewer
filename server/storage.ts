import { matrices, type Matrix, type InsertMatrix } from "@shared/schema";

export interface IStorage {
  getMatrix(id: number): Promise<Matrix | undefined>;
  createMatrix(matrix: InsertMatrix): Promise<Matrix>;
  listMatrices(): Promise<Matrix[]>;
}

export class MemStorage implements IStorage {
  private matrices: Map<number, Matrix>;
  currentId: number;

  constructor() {
    this.matrices = new Map();
    this.currentId = 1;
  }

  async getMatrix(id: number): Promise<Matrix | undefined> {
    return this.matrices.get(id);
  }

  async createMatrix(insertMatrix: InsertMatrix): Promise<Matrix> {
    const id = this.currentId++;
    const matrix = { ...insertMatrix, id };
    this.matrices.set(id, matrix);
    return matrix;
  }

  async listMatrices(): Promise<Matrix[]> {
    return Array.from(this.matrices.values());
  }
}

export const storage = new MemStorage();
