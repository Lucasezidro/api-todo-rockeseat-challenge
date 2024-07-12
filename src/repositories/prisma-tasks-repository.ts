import { Prisma, Task } from '@prisma/client'
import { TasksRepository } from './tasks-repository'
import { prisma } from '../lib/prisma'

export class PrismaTasksRepository implements TasksRepository {
  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    const task = await prisma.task.create({
      data,
    })

    return task
  }

  async delete(task: Task): Promise<void> {
    await prisma.task.delete({
      where: {
        id: task.id,
      },
    })
  }

  async save(task: Task): Promise<Task> {
    const updatedTask = await prisma.task.update({
      where: {
        id: task.id,
      },
      data: task,
    })

    return updatedTask
  }

  async fetchTasks(): Promise<Task[]> {
    const tasks = await prisma.task.findMany()

    return tasks
  }

  async findById(id: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    })

    return task
  }
}
