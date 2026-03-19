import { describe, test, expect } from 'vitest'
import { Location } from '../src/classes/location'
import { Dimension } from '../src/classes/dimension'

const dimension = new Dimension('1', "Dimensión Cronenberg", "Dimensión loca e irascible.", 'Activa', 5)

describe("Location function tests", () => {
  test("Instance of Location", () => {
    expect(new Location('C-123', "Mustafar", "Planeta de lava", 'Planeta', dimension, 5000)).toBeInstanceOf(Location);
  })

  test("Initialize of Location", () => {
    const location = new Location('C-123', "Mustafar", "Planeta de lava", 'Planeta', dimension, 5000)
    expect(location.id).toBe('C-123');
    expect(location.name).toBe('Mustafar');
    expect(location.description).toBe('Planeta de lava');
    expect(location.type).toBe('Planeta');
    expect(location.dimension).toBe(dimension);
    expect(location.population).toBe(5000);
  })
  
  test("Errors for invalid parameters", () => {
    expect(() => new Location("C-124", "Geonosis", "Planeta desértico, habitado por genosianos", 'Planeta', dimension, -1000)).toThrowError("Población no puede ser negativa")
    expect(() => new Location("C-213", "Felucia", "", 'Planeta', dimension, 5000)).toThrowError("Description no puede ser vacío")
    expect(() => new Location("C-245", "", "Planeta del Acklay", 'Planeta', dimension, 5000)).toThrowError("Name no puede ser vacío")
    expect(() => new Location("", "Coruscant", "Planeta del Templo Jedi",'Planeta', dimension, 5000)).toThrowError("Id no puede ser vacío")
  })
})