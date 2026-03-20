import { describe, test, expect } from 'vitest'
import { TravelEvent } from '../src/classes/travelEvent'

describe("Pruebas de TravelEvent", () => {
  test("Instance", () => {
    expect(new TravelEvent("idcharacter1", "C-120", new Date("2026-2-2"),"Se aburre")).toBeInstanceOf(TravelEvent);
  })

  test("createDescription()", () => {
    const travelEvent = new TravelEvent("idcharacter1", "C-120", new Date("2026-2-2"),"Se aburre");
    expect(travelEvent.createDescription()).toBe("Darth Vader viajó a la dimensión Dimensión Cronenberg. Motivo del viaje: Se aburre. Fecha: 2/2/2026, 0:00:00")
  })
})

