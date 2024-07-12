import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeFindTaskById } from '../factories/find-task-by-id'

export async function findTaskById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/task/:id',
    {
      schema: {
        tags: ['Tasks'],
        summary: 'Find task by id',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          204: z.object({
            task: z.object({
              id: z.string().uuid(),
              title: z.string(),
              description: z.string(),
              isCompleted: z.boolean().nullable(),
              completedAt: z.date().nullable(),
              createdAt: z.coerce.date(),
              updatedAt: z.coerce.date(),
            }),
          }),
        },
      },
    },
    async (request) => {
      const { id } = request.params

      const findTaskById = makeFindTaskById()

      const { task } = await findTaskById.execute({
        taskId: id,
      })
      return { task }
    },
  )
}
