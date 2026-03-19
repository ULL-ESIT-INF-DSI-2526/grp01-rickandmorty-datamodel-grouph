import { expect, describe, test } from 'vitest'
import { Dimension } from '../src/classes/dimension'

describe("Dimension function tests", () => {
  test("Instance of Dimension", () => {
    expect(new Dimension('J324A', "Dimensión Cronenberg", "Dimensión loca e irascible.", 'Activa', 5)).toBeInstanceOf(Dimension);
  })

  test("Initialize of Dimension", () => {
    const dimension = new Dimension('J324A', "Dimensión Cronenberg", "Dimensión loca e irascible", 'Activa', 5)
    expect(dimension.id).toBe('J324A');
    expect(dimension.name).toBe('Dimensión Cronenberg');
    expect(dimension.description).toBe("Dimensión loca e irascible");
    expect(dimension.state).toBe('Activa');
    expect(dimension.tecnologyLevel).toBe(5);
  })

  test("Errors for invalid parameters", () => {
    expect(() => new Dimension("J324A", "Dimensión Errónea", "Dimensión...", 'Activa', 11)).toThrowError("Nivel tecnológico no válido")
    expect(() => new Dimension("J324A", "Dimensión Errónea", "", 'Activa', 2, )).toThrowError("Description no puede ser vacío")
    expect(() => new Dimension("J324A", "", "Dimensión...", 'Activa', 2)).toThrowError("Name no puede ser vacío")
    expect(() => new Dimension("", "Dimensión Errónea", "Dimensión...",'Activa', 2)).toThrowError("El ID no sigue la nomenclatura del Consejo de Ricks")
  })
})
