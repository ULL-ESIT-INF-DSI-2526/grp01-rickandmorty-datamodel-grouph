import { describe, expect, test } from 'vitest'
import { add } from '../src/index'

describe('add function test', () => {
  test('add(30, 15) returns 45', () => {
    expect(add(30, 15)).toBe(45)
  })

  test('add(30, -15) returns 15', () => {
    expect(add(30, -15)).toBe(15)
  })
})