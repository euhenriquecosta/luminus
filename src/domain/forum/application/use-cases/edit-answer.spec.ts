import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'

import { EditAnswerUseCase } from './edit-answer.js'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers.repository.js'

import { makeAnswer } from 'test/factories/make-answer.factory.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.vo.js'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository);
  })

  it('deve ser possivel editar uma pergunta', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('answer-1'))

    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
	    answerId: newAnswer.id.toValue(),
			authorId: 'author-1',
      content: 'Conteúdo teste'
		})

    const editedAnswer = {
      content: inMemoryAnswerRepository.items[0].content
    }

    assert.deepEqual(editedAnswer, {
      content: 'Conteúdo teste'
    })
  })

  it('não deve ser possivel editar uma pergunta de um outro usuário', async () => {
    const newAnswer = makeAnswer({
			authorId: new UniqueEntityId('author-1')
		}, new UniqueEntityId('answer-1'))

    await inMemoryAnswerRepository.create(newAnswer)

		await assert.rejects(
      sut.execute({
        answerId: newAnswer.id.toValue(),
        authorId: 'author-2',
        content: 'Conteúdo teste'
      }),
      {
        name: 'Error'
      }
    )
  })
})
