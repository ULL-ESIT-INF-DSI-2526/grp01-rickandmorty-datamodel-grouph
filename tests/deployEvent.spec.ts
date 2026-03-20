import { describe, test, expect } from 'vitest'
import { DeployEvent } from '../src/classes/deployEvent'

describe("Pruebas de DeployEvent", () => {
  test("Instance", () => {
    expect(new DeployEvent("idarma1", "idlocation6")).toBeInstanceOf(DeployEvent);
  })

  test("createDescription()", () => {
    const deployEvent = new DeployEvent("idarma1", "idlocation6");
    expect(deployEvent.createDescription()).toBe("Despliegue del artefacto Sable de Luz en la localización Tatooine");
  
    const deploy2Event = new DeployEvent("idarma99", "idlocation6");
    expect(() => deploy2Event.createDescription()).toThrowError("Evento fallido. No se encontró el personaje con ID idarma99.");
    const deploy3Event = new DeployEvent("idarma1", "idlocation99");
    expect(() => deploy3Event.createDescription()).toThrowError("Evento fallido. No se encontró la localización con ID idlocation99.")
  });
})