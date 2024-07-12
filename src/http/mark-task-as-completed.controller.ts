import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeMarkTaskAsComplete } from '../factories/make-mark-task-as-completed'

export async function markTasAsComplete(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/task/:id/complete',
    {
      schema: {
        tags: ['Tasks'],
        summary: 'Mark task as complete',
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          isCompleted: z.boolean(),
        }),
        response: {
          201: z.object({
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
      const { isCompleted } = request.body

      const markTaskAsComplete = makeMarkTaskAsComplete()

      const { task } = await markTaskAsComplete.execute({
        taskId: id,
        isCompleted,
      })
      return { task }
    },
  )
}
