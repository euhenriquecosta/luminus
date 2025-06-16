import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'

import { EditQuestionUseCase } from './edit-question.js'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question.repository.js'

import { makeQuestion } from 'test/factories/make-question.factory.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.vo.js'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionRepository);
  })

  it('deve ser possivel editar uma pergunta', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)

    await sut.execute({
			questionId: newQuestion.id.toValue(),
			authorId: 'author-1',
      title: 'Pergunta teste',
      content: 'Conteúdo teste'
		})

    const editedQuestion = {
      title: inMemoryQuestionRepository.items[0].title,
      content: inMemoryQuestionRepository.items[0].content
    }

    assert.deepEqual(editedQuestion, {
      title: 'Pergunta teste',
      content: 'Conteúdo teste'
    })
  })

  it('não deve ser possivel editar uma pergunta de um outro usuário', async () => {
    const newQuestion = makeQuestion({
			authorId: new UniqueEntityId('author-1')
		}, new UniqueEntityId('question-1'))

    await inMemoryQuestionRepository.create(newQuestion)

		await assert.rejects(
      sut.execute({
        questionId: newQuestion.id.toValue(),
        authorId: 'author-2',
        title: 'Pergunta teste',
        content: 'Conteúdo teste'
      }),
      {
        name: 'Error'
      }
    )
  })
})
