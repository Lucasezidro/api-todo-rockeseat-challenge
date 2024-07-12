import { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'
import { BadRequestError } from './errors/BadRequestError'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation Error.',
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  console.error(error)

  return reply.status(500).send({ message: 'Internal server error.' })
}
