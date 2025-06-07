import { Slug } from "./value-objects/slug.js";

import { Entity } from "../../core/entities/entity.js";

interface QuestionProps {
  title: string;
  content: string;
  authorId: string;
  slug: Slug;
}

export class Question extends Entity<QuestionProps> {
}