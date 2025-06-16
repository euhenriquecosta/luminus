import { Answer } from '@/domain/forum/enterprise/entities/answer.js'

export interface AnswersRepository {
  findById(id: string): Promise<Answer | null>
  delete(answer: Answer): Promise<void>
  create(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
}
