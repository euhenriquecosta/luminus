import { AnswersRepository } from '@/domain/forum/application/repositories/answers.repository.js'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface DeleteAnswerUseCaseResponse {
}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Pergunta não encontrada.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Não permitido.')
    }

    await this.answersRepository.delete(answer)

    return {}
  }
}
