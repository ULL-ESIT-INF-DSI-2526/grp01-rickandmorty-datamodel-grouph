import { describe, test, expect } from 'vitest'
import { NeutralizationEvent } from '../src/classes/neutralizationEvent'

describe("Pruebas de NeutralizationEvent", () => {
  test("Instance", () => {
    expect(new NeutralizationEvent("idarma1", "idlocation6")).toBeInstanceOf(NeutralizationEvent);
  })

  test("createDescription()", () => {
    const neutralizationEvent = new NeutralizationEvent("C-120", "Thanos chascó los dedos");
    expect(neutralizationEvent.createDescription()).toBe("Neutralización del artefacto Sable de luz en la localización Tatooine");
  });
})