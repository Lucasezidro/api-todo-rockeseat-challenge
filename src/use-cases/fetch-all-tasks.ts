import { Task } from '@prisma/client'
import { TasksRepository } from '../repositories/tasks-repository'

interface FetchAllTasksUseCaseResponse {
  tasks: Task[]
}

export class FetchAllTasksUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute(): Promise<FetchAllTasksUseCaseResponse> {
    const tasks = await this.tasksRepository.fetchTasks()

    return { tasks }
  }
}
