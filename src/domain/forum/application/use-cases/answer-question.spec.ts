import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'

import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question.js'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers.repository.js'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('Answer Question', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('deve ser possivel criar uma resposta', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Nova resposta',
    })
    
    assert.ok(answer.id)
    assert.equal(inMemoryAnswerRepository.items[0].id, answer.id)
  })
})
