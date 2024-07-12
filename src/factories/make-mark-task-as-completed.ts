import { PrismaTasksRepository } from '../repositories/prisma-tasks-repository'
import { MarkTaskAsCompleteUseCase } from '../use-cases/mark-task-as-completed'

export function makeMarkTaskAsComplete() {
  const taskRepository = new PrismaTasksRepository()
  const markTaskAsCompleteUseCase = new MarkTaskAsCompleteUseCase(
    taskRepository,
  )

  return markTaskAsCompleteUseCase
}
