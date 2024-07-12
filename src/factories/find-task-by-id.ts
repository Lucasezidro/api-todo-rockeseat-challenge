import { PrismaTasksRepository } from '../repositories/prisma-tasks-repository'
import { FindTaskByIdUseCase } from '../use-cases/find-task-by-id'

export function makeFindTaskById() {
  const taskRepository = new PrismaTasksRepository()
  const findTaskByIdUseCase = new FindTaskByIdUseCase(taskRepository)

  return findTaskByIdUseCase
}
