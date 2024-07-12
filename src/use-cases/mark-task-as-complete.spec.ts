import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTasksRepository } from '../repositories/in-memory-tasks-repository'
import { MarkTaskAsCompleteUseCase } from './mark-task-as-completed'

let tasksRepository: InMemoryTasksRepository
let sut: MarkTaskAsCompleteUseCase

describe('Mark Task as Complete', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new MarkTaskAsCompleteUseCase(tasksRepository)
  })

  it('should be able to mark task as complete', async () => {
    const createdTask = await tasksRepository.create({
      title: 'New Task',
      description: 'some task description',
      completedAt: new Date(),
      isCompleted: false,
    })

    const { task } = await sut.execute({
      taskId: createdTask.id,
      isCompleted: true,
    })

    expect(task.isCompleted).toEqual(true)
  })
})
