import { faker } from "@faker-js/faker"

import { UniqueEntityId } from "@/core/entities/unique-entity-id.vo.js"

import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question.js"

export function makeQuestion(override?: Partial<QuestionProps>, id?: UniqueEntityId) {
	const question = Question.create({
		authorId: new UniqueEntityId,
		title: faker.lorem.sentence(),
		content: faker.lorem.text(),
		...override
	}, 
	id,
	)

	return question
}