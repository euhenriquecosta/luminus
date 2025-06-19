import assert from 'node:assert'
import { beforeEach, describe, it } from 'node:test'

import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers.repository.js'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question.repository.js'

import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer.js'

import { UniqueEntityId } from '@/core/entities/unique-entity-id.vo.js'
import { makeAnswer } from 'test/factories/make-answer.factory.js'
import { makeQuestion } from 'test/factories/make-question.factory.js'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Best Answer', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryQuestionRepository,
    )
  })

  it('deve ser possivel definir uma resposta como melhor resposta', async () => {
    const newQuestion = makeQuestion()
    const newAnswer = makeAnswer({
      questionId: newQuestion.id,
    })

    await inMemoryQuestionRepository.create(newQuestion)
    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newQuestion.authorId.toString(),
    })

    assert.equal(inMemoryQuestionRepository.items[0].bestAnswerId, newAnswer.id)
  })

  it('não deve ser possivel definir uma resposta como melhor resposta de um outro usuário', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })
    const newAnswer = makeAnswer({ questionId: newQuestion.id })

    await inMemoryQuestionRepository.create(newQuestion)
    await inMemoryAnswerRepository.create(newAnswer)

    await assert.rejects(
      async () =>
        await sut.execute({
          answerId: newAnswer.id.toString(),
          authorId: 'author-999',
        }),
      {
        name: 'Error',
        message: 'Não permitido.',
      },
    )
  })
})
