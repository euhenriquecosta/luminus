import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'

import { DeleteQuestionUseCase } from './delete-question.js'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question.repository.js'

import { makeQuestion } from 'test/factories/make-question.factory.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.vo.js'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionRepository);
  })

  it('deve ser possivel deletar uma pergunta', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)

    await sut.execute({
			questionId: 'question-1',
			authorId: 'author-1'
		})

    assert.strictEqual(inMemoryQuestionRepository.items.length, 0)
  })

  it('não deve ser possivel deletar uma pergunta de um outro usuário', async () => {
    const newQuestion = makeQuestion({
			authorId: new UniqueEntityId('author-1')
		}, new UniqueEntityId('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)

		await assert.rejects(
      sut.execute({
        authorId: 'author-2',
        questionId: 'question-1'
      }),
      {
        name: 'Error'
      }
    )
  })
})
