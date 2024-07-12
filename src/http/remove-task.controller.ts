import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeRemoveTask } from '../factories/make-remove-task'

export async function removeTask(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/task/:id',
    {
      schema: {
        tags: ['Tasks'],
        summary: 'Update a task',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.null(),
        },
      },
    },
    async (request) => {
      const { id } = request.params

      const removeTask = makeRemoveTask()

      await removeTask.execute({
        taskId: id,
      })
    },
  )
}
