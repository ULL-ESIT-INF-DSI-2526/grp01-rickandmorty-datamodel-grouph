import { describe, test, expect } from 'vitest'
import { TravelEvent } from '../src/classes/travelEvent'

describe("Pruebas de TravelEvent", () => {
  test("Instance", () => {
    expect(new TravelEvent("idcharacter1", "C-120", new Date("2026-2-2"),"Se aburre")).toBeInstanceOf(TravelEvent);
  })

  test("createDescription()", () => {
    const travelEvent = new TravelEvent("idcharacter1", "C-120", new Date("2026-2-2"),"Se aburre");
    expect(travelEvent.createDescription()).toBe("Darth Vader viajó a la dimensión Dimensión Cronenberg. Motivo del viaje: Se aburre. Fecha: 2/2/2026, 0:00:00.")

    
    const travel2Event = new TravelEvent("C-999", "C-120", new Date("2026-2-2"),"Se aburre");
    expect(() => travel2Event.createDescription()).toThrowError("Evento fallido. No se encontró el personaje con ID C-999.");
    const travel3Event = new TravelEvent("idcharacter1", "C-999", new Date("2026-2-2"),"Se aburre");
    expect(() => travel3Event.createDescription()).toThrowError("Evento fallido. No se encontró la dimensión con ID C-999.");
    const travel4Event = new TravelEvent("idcharacter1", "C-120", new Date("2028-2-2"),"Se aburre");
    expect(() => travel4Event.createDescription()).toThrowError("Evento fallido. Fecha no válida");
  })
})

