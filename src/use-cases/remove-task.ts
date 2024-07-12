import { TasksRepository } from '../repositories/tasks-repository'
import { BadRequestError } from '../errors/BadRequestError'

interface RemoveTaskUseCaseRequest {
  taskId: string
}

export class RemoveTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({ taskId }: RemoveTaskUseCaseRequest): Promise<void> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      throw new BadRequestError('Task not found.')
    }

    await this.tasksRepository.delete(task)
  }
}
