import { PrismaTasksRepository } from '../repositories/prisma-tasks-repository'
import { FetchAllTasksUseCase } from '../use-cases/fetch-all-tasks'

export function makeFetchAllTasks() {
  const taskRepository = new PrismaTasksRepository()
  const fatchAllTasksUseCase = new FetchAllTasksUseCase(taskRepository)

  return fatchAllTasksUseCase
}
