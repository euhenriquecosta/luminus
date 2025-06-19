import assert from 'node:assert'
import { beforeEach, describe, it } from 'node:test'

import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question.js'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question.repository.js'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

  it('deve ser possivel criar uma pergunta', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'Nova pergunta',
      content: 'Conteúdo da pergunta',
    })

    assert.ok(question.id)
    assert.equal(inMemoryQuestionRepository.items[0].id, question.id)
  })
})
