import { describe, test, expect } from 'vitest'
import { DestructionEvent } from '../src/classes/destructionEvent'

describe("Pruebas de DestructionEvent", () => {
  test("Instance", () => {
    expect(new DestructionEvent("C-120", "Thanos chascó los dedos")).toBeInstanceOf(DestructionEvent);
  })

  test("createDescription()", () => {
    const destructionEvent = new DestructionEvent("C-120", "Thanos chascó los dedos");
    expect(destructionEvent.createDescription()).toBe("Destrucción de la Dimensión Cronenberg, como consecuencia de Thanos chascó los dedos");
  });
})