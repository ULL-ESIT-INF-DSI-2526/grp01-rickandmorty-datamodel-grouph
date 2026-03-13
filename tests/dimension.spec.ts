import { expect, describe, test } from 'vitest'
import { Dimension } from '../src/classes/dimension'

describe("Pruebas de BasicUniversalObject", () => {
  test("Creación del objeto", () => {
    expect(new Dimension(1, "Dimensión Cronenberg", 'Activa', 5, "Dimensión loca e irascible.")).toBeInstanceOf(Dimension);
    expect(() => new Dimension("C3-PO", "Dimensión Errónea", 'Gaseosa', 2, "Dimensión...")).toThrowError("Estado no válido")
    expect(() => new Dimension("C3-PO", "Dimensión Errónea", 'Activa', 11, "Dimensión...")).toThrowError("Nivel tecnológico no válido")
    expect(() => new Dimension("C3-PO", "Dimensión Errónea", 'Activa', 2, "")).toThrowError("Description no puede ser vacío")
    expect(() => new Dimension("C3-PO", "", 'Activa', 2, "Dimensión...")).toThrowError("Name no puede ser vacío")
    expect(() => new Dimension("", "Dimensión Errónea", 'Activa', 2, "Dimensión...")).toThrowError("Id no puede ser vacío")
  })
})
