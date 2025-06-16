import { AnswersRepository } from "@/domain/forum/application/repositories/answers.repository.js";
import { Answer } from "@/domain/forum/enterprise/entities/answer.js";

export class InMemoryAnswerRepository implements AnswersRepository {
  public items: Answer[] = []

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find(item => item.id.toString() === id)

    if (!answer) return null

    return answer
  }
  
  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === answer.id)

    this.items.splice(itemIndex, 1)
  }

  async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === answer.id)

    this.items[itemIndex] = answer
  }
}