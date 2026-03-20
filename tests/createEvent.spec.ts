import { describe, test, expect } from 'vitest'
import { CreateEvent } from '../src/classes/createEvent'

describe("Pruebas de CreateEvent", () => {
  test("Instance", () => {
    expect(new CreateEvent("C-120", "Thanos chascó los dedos")).toBeInstanceOf(CreateEvent);
  })

  test("createDescription()", () => {
    const createEvent = new CreateEvent("C-120", "Thanos chascó los dedos");
    expect(createEvent.createDescription()).toBe("Creación de la Dimensión Cronenberg, como consecuencia de Thanos chascó los dedos");
  });
})

