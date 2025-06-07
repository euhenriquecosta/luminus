import { Slug } from "./value-objects/slug.js";

import { Entity } from "../../core/entities/entity.js";
import { UniqueEntityId } from "../../core/entities/unique-entity-id.vo.js";

interface QuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId;
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
}