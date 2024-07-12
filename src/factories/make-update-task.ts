import { PrismaTasksRepository } from '../repositories/prisma-tasks-repository'
import { UpdateTaskUseCase } from '../use-cases/update-task'

export function makeUpdateTask() {
  const taskRepository = new PrismaTasksRepository()
  const updateTaskUseCase = new UpdateTaskUseCase(taskRepository)

  return updateTaskUseCase
}
