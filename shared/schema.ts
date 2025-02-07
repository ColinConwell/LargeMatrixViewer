import { pgTable, text, serial, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const matrices = pgTable("matrices", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  data: jsonb("data").$type<number[][]>().notNull(),
  rows: text("rows").notNull(),
  cols: text("cols").notNull()
});

export const insertMatrixSchema = createInsertSchema(matrices).pick({
  name: true,
  data: true,
  rows: true,
  cols: true
});

export type InsertMatrix = z.infer<typeof insertMatrixSchema>;
export type Matrix = typeof matrices.$inferSelect;
