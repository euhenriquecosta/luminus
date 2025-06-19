import { QuestionsRepository } from '@/domain/forum/application/repositories/questions.repository.js'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Pergunta não encontrada.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Não permitido.')
    }

    await this.questionsRepository.delete(question)

    return {}
  }
}
