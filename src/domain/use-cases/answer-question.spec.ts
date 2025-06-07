import test from 'node:test'
import assert from 'node:assert'
import { AnswerQuestionUseCase } from './answer-question.js';
import { AnswersRepository } from '../repositories/answers.repository.js';
import { Answer } from '../entities/answer.js';

const fakeAnswerRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    console.log(answer)
    return 
  }
}

test('deve ser criado uma resposta', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository);

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova resposta'
  })

  assert.equal(answer.content, 'Nova resposta')
});