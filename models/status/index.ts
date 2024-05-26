import { z } from "zod";

export const StatusSchema = z.object({
  updated_at: z.string(),
  dependencies: z.object({
    database: z.object({
      version: z.string(),
      max_connections: z.number(),
      active_connections: z.number(),
    }),
  }),
});
