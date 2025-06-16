import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'

import { DeleteAnswerUseCase } from './delete-answer.js'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers.repository.js'

import { makeAnswer } from 'test/factories/make-answer.factory.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.vo.js'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository);
  })

  it('deve ser possivel deletar uma resposta', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('answer-1'))

    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
			answerId: 'answer-1',
			authorId: 'author-1'
		})

    assert.strictEqual(inMemoryAnswerRepository.items.length, 0)
  })

  it('não deve ser possivel deletar uma resposta de um outro usuário', async () => {
    const newAnswer = makeAnswer({
			authorId: new UniqueEntityId('author-1')
		}, new UniqueEntityId('answer-1'))

    await inMemoryAnswerRepository.create(newAnswer)

		await assert.rejects(
      sut.execute({
        authorId: 'author-2',
        answerId: 'answer-1'
      }),
      {
        name: 'Error'
      }
    )
  })
})
