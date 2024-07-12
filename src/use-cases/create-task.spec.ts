import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTasksRepository } from '../repositories/in-memory-tasks-repository'
import { CreateTaskUseCase } from './create-task'

let tasksRepository: InMemoryTasksRepository
let sut: CreateTaskUseCase

describe('Create Task', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new CreateTaskUseCase(tasksRepository)
  })

  it('should be able to create a task', async () => {
    const { task } = await sut.execute({
      title: 'New Task',
      description: 'some task description',
      isCompleted: false,
    })

    expect(task.id).toEqual(expect.any(String))
  })
})
