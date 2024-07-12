import { Prisma, Task } from '@prisma/client'
import { TasksRepository } from './tasks-repository'

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = []

  async create(data: Prisma.TaskCreateInput) {
    const task = {
      id: 'task-id',
      title: data.title,
      description: data.description,
      completedAt: (data.completedAt as Date) ?? new Date(),
      isCompleted: data.isCompleted ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(task)

    return task
  }

  async delete(task: Task): Promise<void> {
    const taskIndex = this.items.findIndex((item) => item.id === task.id)

    this.items.splice(taskIndex, 1)
  }

  async save(task: Task): Promise<Task> {
    const taskIndex = this.items.findIndex((item) => item.id === task.id)

    if (taskIndex >= 0) {
      this.items[taskIndex] = task
    }

    return task
  }

  async fetchTasks(): Promise<Task[]> {
    const tasks = this.items

    return tasks
  }

  async findById(id: string): Promise<Task | null> {
    const task = this.items.find((item) => item.id === id)

    if (!task) {
      return null
    }

    return task
  }
}
