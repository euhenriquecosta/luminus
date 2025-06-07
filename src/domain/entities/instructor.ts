import { Entity } from "../../core/entities/entity.js";

interface InstructorProps {
  name: string;
}

export class Instructor extends Entity<InstructorProps> {
}