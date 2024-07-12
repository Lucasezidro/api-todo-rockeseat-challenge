import { Task } from '@prisma/client'
import { TasksRepository } from '../repositories/tasks-repository'
import { BadRequestError } from '../errors/BadRequestError'

interface MarkTaskAsCompleteUseCaseRequest {
  taskId: string
  isCompleted: boolean
}

interface MarkTaskAsCompleteUseCaseResponse {
  task: Task
}

export class MarkTaskAsCompleteUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    taskId,
    isCompleted,
  }: MarkTaskAsCompleteUseCaseRequest): Promise<MarkTaskAsCompleteUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      throw new BadRequestError('Task not found.')
    }

    task.isCompleted = isCompleted

    await this.tasksRepository.save(task)

    return { task }
  }
}
