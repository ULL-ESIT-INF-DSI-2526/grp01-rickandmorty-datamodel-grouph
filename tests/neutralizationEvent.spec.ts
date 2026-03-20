import { describe, test, expect } from 'vitest'
import { NeutralizationEvent } from '../src/classes/neutralizationEvent'

describe("Pruebas de NeutralizationEvent", () => {
  test("Instance", () => {
    expect(new NeutralizationEvent("idarma1", "idlocation6")).toBeInstanceOf(NeutralizationEvent);
  })

  test("createDescription()", () => {
    const neutralizationEvent = new NeutralizationEvent("idarma1", "idlocation6");
    expect(neutralizationEvent.createDescription()).toBe("Neutralización del artefacto Sable de Luz en la localización Tatooine");
  
    const neutralization2Event = new NeutralizationEvent("idarma99", "idlocation6");
    expect(() => neutralization2Event.createDescription()).toThrowError("Evento fallido. No se encontró el personaje con ID idarma99.");
     const neutralization3Event = new NeutralizationEvent("idarma1", "idlocation99");
    expect(() => neutralization3Event.createDescription()).toThrowError("Evento fallido. No se encontró la localización con ID idlocation99.")
  });
})