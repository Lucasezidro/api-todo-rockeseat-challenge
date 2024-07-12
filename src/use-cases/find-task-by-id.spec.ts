import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTasksRepository } from '../repositories/in-memory-tasks-repository'
import { FindTaskByIdUseCase } from './find-task-by-id'
import { BadRequestError } from '../errors/BadRequestError'

let tasksRepository: InMemoryTasksRepository
let sut: FindTaskByIdUseCase

describe('Find task by id', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new FindTaskByIdUseCase(tasksRepository)
  })

  it('should be able to find some task by id', async () => {
    const createdTask = await tasksRepository.create({
      title: 'New Task',
      description: 'some task description',
      completedAt: new Date(),
      isCompleted: false,
    })

    const { task } = await sut.execute({
      taskId: createdTask.id,
    })

    expect(task.title).toEqual('New Task')
  })

  it('should not be able to find a unexisting task', async () => {
    await tasksRepository.create({
      title: 'New Task',
      description: 'some task description',
      completedAt: new Date(),
      isCompleted: false,
    })

    await expect(() =>
      sut.execute({
        taskId: 'unexisting-id',
      }),
    ).rejects.toBeInstanceOf(BadRequestError)
  })
})
