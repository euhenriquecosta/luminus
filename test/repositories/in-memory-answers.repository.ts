import { AnswersRepository } from "@/domain/forum/application/repositories/answers.repository.js";
import { Answer } from "@/domain/forum/enterprise/entities/answer.js";

export class InMemoryAnswerRepository implements AnswersRepository {
  public items: Answer[] = []
  
  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }
}