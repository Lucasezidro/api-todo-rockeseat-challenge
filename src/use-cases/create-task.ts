import { Task } from '@prisma/client'
import { TasksRepository } from '../repositories/tasks-repository'

interface CreateTaskUseCaseRequest {
  title: string
  description: string
  isCompleted: boolean
}

interface CreateTaskUseCaseResponse {
  task: Task
}

export class CreateTaskUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    title,
    description,
    isCompleted,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const task = await this.tasksRepository.create({
      title,
      description,
      isCompleted,
    })

    return { task }
  }
}
