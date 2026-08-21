import { z } from "zod";

export const openPackSchema = z.object({
  packId: z.string().uuid(),
  quantity: z.number().int().min(1).max(10).default(1),
});

export type OpenPackInput = z.infer<typeof openPackSchema>;
