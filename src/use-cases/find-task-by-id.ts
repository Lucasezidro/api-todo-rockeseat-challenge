import { Task } from '@prisma/client'
import { TasksRepository } from '../repositories/tasks-repository'
import { BadRequestError } from '../errors/BadRequestError'

interface FindTaskByIdUseCaseRequest {
  taskId: string
}

interface FindTaskByIdUseCaseResponse {
  task: Task
}

export class FindTaskByIdUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    taskId,
  }: FindTaskByIdUseCaseRequest): Promise<FindTaskByIdUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      throw new BadRequestError('Task not found.')
    }

    return { task }
  }
}
