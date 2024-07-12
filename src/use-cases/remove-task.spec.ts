import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTasksRepository } from '../repositories/in-memory-tasks-repository'
import { RemoveTaskUseCase } from './remove-task'

let tasksRepository: InMemoryTasksRepository
let sut: RemoveTaskUseCase

describe('Remove Task', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new RemoveTaskUseCase(tasksRepository)
  })

  it('should be able to remove task', async () => {
    const createdTask = await tasksRepository.create({
      title: 'New Task',
      description: 'some task description',
      completedAt: new Date(),
      isCompleted: false,
    })

    await sut.execute({
      taskId: createdTask.id,
    })

    expect(tasksRepository.items).toHaveLength(0)
  })
})
