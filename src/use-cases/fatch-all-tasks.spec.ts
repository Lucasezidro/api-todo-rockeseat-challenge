import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTasksRepository } from '../repositories/in-memory-tasks-repository'
import { FetchAllTasksUseCase } from './fetch-all-tasks'

let tasksRepository: InMemoryTasksRepository
let sut: FetchAllTasksUseCase

describe('Fetch All Tasks', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new FetchAllTasksUseCase(tasksRepository)
  })

  it('should be able to fetch all tasks', async () => {
    await tasksRepository.create({
      title: 'New Task',
      description: 'some task description',
      completedAt: new Date(),
      isCompleted: false,
    })

    await tasksRepository.create({
      title: 'New Task 2',
      description: 'some task description',
      completedAt: new Date(),
      isCompleted: false,
    })

    await tasksRepository.create({
      title: 'New Task 3',
      description: 'some task description',
      completedAt: new Date(),
      isCompleted: false,
    })

    const { tasks } = await sut.execute()

    expect(tasks).toHaveLength(3)
  })
})
