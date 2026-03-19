import { describe, test, expect} from "vitest";
import { Specie } from "../src/classes/species.js";
import { Location } from "../src/classes/location.js";
import { SpeciesType } from "../src/types/speciesType.js";
import { Dimension } from "../src/classes/dimension.js";

const dimension = new Dimension('1', "Dimensión Cronenberg", "Dimensión loca e irascible.", 'Activa', 5)
const location = new Location('C-000', "Tierra", "Planeta de origen de los humanos", 'Planeta', dimension, 48932489124)

describe("Tests para la clase Specie", () => {
  test('Objeto Specie se crea correctamente', () => {
    const dimension = new Dimension('1', "Dimensión Cronenberg", "Dimensión loca e irascible.", 'Activa', 5);
    const Tierra = new Location('C-000', "Tierra", "Planeta de origen de los humanos", 'Planeta', dimension, 48932489124);
    const humanSpecie = new Specie("C-001", "Human", "Especie común en todas las dimensiones", Tierra, "Humanoide", 80);
    expect(humanSpecie).toBeInstanceOf(Specie);
    expect(humanSpecie.id).toBe("C-001");
    expect(humanSpecie.name).toBe("Human");
    expect(humanSpecie.description).toBe("Especie común en todas las dimensiones");
    expect(humanSpecie.originLocation).toBe(Tierra);
    expect(humanSpecie.type).toBe("Humanoide");
    expect(humanSpecie.averageLifespan).toBe(80);
  })

  test('averageLifespan no puede ser negativo', () => {
    expect(() => new Specie("C-002", 'Wookie', 'Muy fuertes', location, 'Humanoide', -100)).toThrowError("El tiempo de vida medio no puede ser negativo")  
  })

  test('originLocation no puede ser nula', () => {
    expect(() => new Specie("C-003", 'Droid', 'Seres mecánicos', null, 'Robot', 50)).toThrowError("La ubicación de origen no puede ser nula")  
  })

  test('Se puede cambiar type', () => {
    const dimension = new Dimension('1', "Dimensión Cronenberg", "Dimensión loca e irascible.", 'Activa', 5);
    const Tierra = new Location('C-000', "Tierra", "Planeta de origen de los humanos", 'Planeta', dimension, 48932489124);
    const humanSpecie = new Specie("C-001", "Human", "Especie común en todas las dimensiones", Tierra, "Humanoide", 80);
    humanSpecie.type = 'Parásito'
    expect(humanSpecie.type).toBe('Parásito');
  })

  test('Se puede cambiar averageLifespan', () => {
    const dimension = new Dimension('1', "Dimensión Cronenberg", "Dimensión loca e irascible.", 'Activa', 5);
    const Tierra = new Location('C-000', "Tierra", "Planeta de origen de los humanos", 'Planeta', dimension, 48932489124);
    const humanSpecie = new Specie("C-001", "Human", "Especie común en todas las dimensiones", Tierra, "Humanoide", 80);
    humanSpecie.averageLifespan = 90;
    expect(humanSpecie.averageLifespan).toBe(90);
  })
  
  test('No se puede cambiar originLocation', () => {
    const dimension = new Dimension('1', "Dimensión Cronenberg", "Dimensión loca e irascible.", 'Activa', 5);
    const Tierra = new Location('C-000', "Tierra", "Planeta de origen de los humanos", 'Planeta', dimension, 48932489124);
    const humanSpecie = new Specie("C-001", "Human", "Especie común en todas las dimensiones", Tierra, "Humanoide", 80);
    expect(() => humanSpecie.originLocation = new Location('C-001', "Marte", "Planeta rojo", 'Planeta', dimension, 0)).toThrowError()
  })
})