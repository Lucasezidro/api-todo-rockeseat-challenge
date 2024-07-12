import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeCreateTask } from '../factories/make-create-task'

export async function createTask(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/tasks',
    {
      schema: {
        tags: ['Tasks'],
        summary: 'Create a new task',
        body: z.object({
          title: z.string(),
          description: z.string(),
          isCompleted: z.boolean().default(false),
        }),
        response: {
          201: z.object({
            taskId: z.string().uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { title, description, isCompleted } = request.body

      const createTask = makeCreateTask()

      try {
        const { task } = await createTask.execute({
          title,
          description,
          isCompleted,
        })
        return reply.status(201).send({ taskId: task.id })
      } catch (err) {
        console.log(err)
      }
    },
  )
}
