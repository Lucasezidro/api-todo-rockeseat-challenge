import { PrismaTasksRepository } from '../repositories/prisma-tasks-repository'
import { RemoveTaskUseCase } from '../use-cases/remove-task'

export function makeRemoveTask() {
  const taskRepository = new PrismaTasksRepository()
  const removeTaskTaskUseCase = new RemoveTaskUseCase(taskRepository)

  return removeTaskTaskUseCase
}
