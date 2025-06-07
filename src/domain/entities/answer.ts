import { Entity } from "../../core/entities/entity.js";
import { UniqueEntityId } from "../../core/entities/unique-entity-id.vo.js";

import { Optional } from "../../core/types/optional.js";

interface AnswerProps {
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }

  static create(props: Optional<AnswerProps, 'createdAt'>, id?: UniqueEntityId) {
    const answer = new Answer({
      ...props,
      createdAt: new Date(),
    }, id)

    return answer
  }
}