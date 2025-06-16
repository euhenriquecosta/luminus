import { QuestionsRepository } from "@/domain/forum/application/repositories/questions.repository.js";
import { Question } from "@/domain/forum/enterprise/entities/question.js";

export class InMemoryQuestionRepository implements QuestionsRepository {
  
  public items: Question[] = []
  
  async findById(id: string): Promise<Question | null> {
    const question = this.items.find(item => item.id.toString() === id)

    if (!question) return null

    return question
  }

  async findBySlug(slug: string) {
    const question = this.items.find(item => item.slug.value === slug)
    
    if (!question) return null
    
    return question
  }

  async create(question: Question) {
    this.items.push(question)
  }

  async delete(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === question.id)

    this.items.splice(itemIndex, 1)
  }
}