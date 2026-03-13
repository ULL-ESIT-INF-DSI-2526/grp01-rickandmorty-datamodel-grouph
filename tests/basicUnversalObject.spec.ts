import { expect, describe, test } from 'vitest'
import { BasicUniversalObject } from '../src/classes/BasicUniversalObject'

describe("Pruebas de BasicUniversalObject", () => {
  test("Creación del objeto", () => {
    expect(new BasicUniversalObject(1, "Rick", "Científico loco")).toBeInstanceOf(BasicUniversalObject)
  })
})