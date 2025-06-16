import { Answer } from '@/domain/entities/answer.js'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
}
