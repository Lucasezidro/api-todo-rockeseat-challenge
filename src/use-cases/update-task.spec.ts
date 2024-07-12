import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTasksRepository } from '../repositories/in-memory-tasks-repository'
import { UpdateTaskUseCase } from './update-task'

let tasksRepository: InMemoryTasksRepository
let sut: UpdateTaskUseCase

describe('Update Task', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new UpdateTaskUseCase(tasksRepository)
  })

  it('should be able to update task', async () => {
    const createdTask = await tasksRepository.create({
      title: 'New Task',
      description: 'some task description',
      completedAt: new Date(),
      isCompleted: false,
    })

    const { task } = await sut.execute({
      ...createdTask,
      taskId: createdTask.id,
      title: 'Updated Task',
    })

    expect(task.title).toEqual('Updated Task')
  })
})
