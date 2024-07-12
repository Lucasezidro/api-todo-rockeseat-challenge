import { Prisma, Task } from '@prisma/client'

export interface TasksRepository {
  create(data: Prisma.TaskCreateInput): Promise<Task>
  delete(task: Task): Promise<void>
  save(task: Task): Promise<Task>

  fetchTasks(): Promise<Task[]>
  findById(id: string): Promise<Task | null>
}
