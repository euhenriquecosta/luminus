import { QuestionsRepository } from "@/domain/forum/application/repositories/questions.repository.js";
import { Question } from "@/domain/forum/enterprise/entities/question.js";

export class InMemoryQuestionRepository implements QuestionsRepository {

  public items: Question[] = []

  async create(question: Question) {
    this.items.push(question)
  }

  async findBySlug(slug: string) {
    const question = this.items.find(item => item.slug.value === slug)

    if (!question) return null
    
    return question
  }

}