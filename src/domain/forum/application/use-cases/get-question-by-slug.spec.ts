import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert'

import { GetQuestionBySlugUseCase } from './get-question-by-slug.js'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question.repository.js'

import { makeQuestion } from 'test/factories/make-question.factory.js'
import { Slug } from '../../enterprise/entities/value-objects/slug.js'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  it('deve ser possivel encontrar uma pergunta pela slug', async () => {
    const newQuestion = makeQuestion({
      slug: new Slug('pergunta-exemplo'),
    })

    inMemoryQuestionRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'pergunta-exemplo',
    })

    assert.ok(question.id)
    assert.equal(question.title, newQuestion.title)
  })
})
