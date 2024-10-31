import { expect, test } from 'vitest'

import { optimiseVersions } from './optimise'

test('it combines compatible versions', () => {
  const dependencies = {
    '18.1.2': ['^18.1.0', '^18.1.2'],
    '18.2.0': ['^18.2.0'],
    '19.0.1': ['19.0.1', '^19.0.0'],
  }

  const result = optimiseVersions(dependencies)

  expect(result).toEqual({
    '18.2.0': ['^18.1.0', '^18.1.2', '^18.2.0'],
    '19.0.1': ['19.0.1', '^19.0.0'],
  })
})
