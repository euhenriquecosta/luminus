import { AnswersRepository } from '@/domain/forum/application/repositories/answers.repository.js'
import { Answer } from '@/domain/forum/enterprise/entities/answer.js'

interface EditAnswerUseCaseRequest {
  answerId: string
  authorId: string
  content: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
    content
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Pergunta não encontrada.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Não permitido.')
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return {
      answer
    }
  }
}
