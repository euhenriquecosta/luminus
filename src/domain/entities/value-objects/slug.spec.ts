import test from 'node:test'
import assert from 'node:assert'

import { Slug } from '@/domain/entities/value-objects/slug.js'

test('deveria ser possivel criar uma nova slug a partir de um texto', () => {
  const slug = Slug.createFromText('Example question title')

  assert.equal(slug.value, 'example-question-title')
})
