import { Task } from '@prisma/client'
import { TasksRepository } from '../repositories/tasks-repository'
import { BadRequestError } from '../errors/BadRequestError'

interface UpdateTaskUseCaseRequest {
  taskId: string
  title: string
  description: string
}

interface UpdateTaskUseCaseResponse {
  task: Task
}

export class UpdateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    taskId,
    title,
    description,
  }: UpdateTaskUseCaseRequest): Promise<UpdateTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      throw new BadRequestError('Task not found.')
    }

    task.title = title
    task.description = description

    await this.tasksRepository.save(task)

    return { task }
  }
}
