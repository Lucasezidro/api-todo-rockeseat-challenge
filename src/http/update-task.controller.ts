import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeUpdateTask } from '../factories/make-update-task'

export async function updateTask(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/task/:id',
    {
      schema: {
        tags: ['Tasks'],
        summary: 'Update a task',
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          title: z.string(),
          description: z.string(),
        }),
        response: {
          201: z.object({
            taskId: z.string().uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params
      const { title, description } = request.body

      const updateTask = makeUpdateTask()

      try {
        const { task } = await updateTask.execute({
          taskId: id,
          title,
          description,
        })
        return reply.status(201).send({ taskId: task.id })
      } catch (err) {
        console.log(err)
      }
    },
  )
}
