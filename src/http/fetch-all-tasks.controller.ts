import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeFetchAllTasks } from '../factories/make-fetch-all-tasks'

export async function fetchAllTasks(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/tasks',
    {
      schema: {
        tags: ['Tasks'],
        summary: 'Fetch all tasks',
        response: {
          204: z.object({
            tasks: z.array(
              z.object({
                id: z.string().uuid(),
                title: z.string(),
                description: z.string(),
                isCompleted: z.boolean().nullable(),
                completedAt: z.date().nullable(),
                createdAt: z.coerce.date(),
                updatedAt: z.coerce.date(),
              }),
            ),
          }),
        },
      },
    },
    async () => {
      const fetchTasks = makeFetchAllTasks()

      const { tasks } = await fetchTasks.execute()

      return { tasks }
    },
  )
}
