import { z } from "zod";

export const startCombatSchema = z.object({
  levelId: z.string().min(1),
  teamCharacterIds: z.array(z.string().uuid()).min(1).max(6),
});

export type StartCombatInput = z.infer<typeof startCombatSchema>;
