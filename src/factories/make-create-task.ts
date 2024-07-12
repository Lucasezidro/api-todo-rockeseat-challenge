import { PrismaTasksRepository } from '../repositories/prisma-tasks-repository'
import { CreateTaskUseCase } from '../use-cases/create-task'

export function makeCreateTask() {
  const taskRepository = new PrismaTasksRepository()
  const createTaskUseCase = new CreateTaskUseCase(taskRepository)

  return createTaskUseCase
}
