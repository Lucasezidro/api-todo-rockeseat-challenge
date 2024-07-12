import cors from '@fastify/cors'

import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { errorHandler } from './error-handler'
import { createTask } from './http/create-task.controller'
import { fetchAllTasks } from './http/fetch-all-tasks.controller'
import { findTaskById } from './http/find-task-by-id.controller'
import { updateTask } from './http/update-task.controller'
import { removeTask } from './http/remove-task.controller'
import { markTasAsComplete } from './http/mark-task-as-completed.controller'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(cors, {
  origin: '*',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'TO DO Rockeseat challenge',
      description: 'Full-stack SaaS with multi-tenant & RBAC.',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(createTask)
app.register(fetchAllTasks)
app.register(findTaskById)
app.register(updateTask)
app.register(removeTask)
app.register(markTasAsComplete)

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => console.log('HTTP server running!'))
