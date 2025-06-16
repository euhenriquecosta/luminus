import test from 'node:test'
import assert from 'node:assert'

import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question.js'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers.repository.js'
import { Answer } from '@/domain/forum/enterprise/entities/answer.js'

const fakeAnswerRepository: AnswersRepository = {
  create: async (answer: Answer) => {},
}

test('deve ser criado uma resposta', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova resposta',
  })

  assert.equal(answer.content, 'Nova resposta')
})
