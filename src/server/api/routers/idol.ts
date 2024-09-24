import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const idolRouter = createTRPCRouter({
  // create: publicProcedure
  //  .input(z.object({ name: z.string().min(1) }))
  //  .mutation(async ({ ctx, input }) => {
  //    await ctx.db.insert(idol).values({
  //      name: input.name,
  //    });
  //  }),

  getIdol: publicProcedure
    .input(z.object({ idolId: z.string() }))
    .query(async ({ ctx, input }) => {
      const idol = await ctx.db.query.idols.findFirst({
        where: (idols, { eq }) => eq(idols.id, input.idolId),
      });

      return idol ?? null;
    }),

  getIdols: publicProcedure.query(async ({ ctx }) => {
    const idols = await ctx.db.query.idols.findMany({
      orderBy: (idols, { desc }) => [desc(idols.birthDate)],
    });

    return idols ?? null;
  }),
});
