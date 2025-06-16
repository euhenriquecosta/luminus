import { QuestionsRepository } from '@/domain/forum/application/repositories/questions.repository.js'

interface EditQuestionUseCaseRequest {
  questionId: string
  authorId: string
  title: string
  content: string
}

interface EditQuestionUseCaseResponse {
}

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
    title,
    content
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Pergunta não encontrada.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Não permitido.')
    }

		question.title = title
		question.content = content

    await this.questionsRepository.save(question)

    return {}
  }
}
