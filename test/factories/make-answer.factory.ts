import { faker } from "@faker-js/faker"

import { UniqueEntityId } from "@/core/entities/unique-entity-id.vo.js"

import { Answer, AnswerProps } from "@/domain/forum/enterprise/entities/answer.js"

export function makeAnswer(override?: Partial<AnswerProps>, id?: UniqueEntityId) {
	const answer = Answer.create({
        authorId: new UniqueEntityId(),
        questionId: new UniqueEntityId(),
        content: faker.lorem.text(),
		...override
	}, 
	id,
	)

	return answer
}