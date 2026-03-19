import { describe, test, expect} from "vitest";
import { Species } from "../src/classes/species.js";
import { Location } from "../src/classes/location.js";
import { SpeciesType } from "../src/types/speciesType.js";
import { Dimension } from "../src/classes/dimension.js";

const dimension = new Dimension('C-124', "Dimensión Cronenberg", "Dimensión loca e irascible.", 'Activa', 5)
const location = new Location('C-000', "Tierra", "Planeta de origen de los humanos", 'Planeta', dimension, 48932489124)

describe("Tests para la clase Species", () => {
  test('Objeto Species se crea correctamente', () => {
    const dimension = new Dimension('C-124', "Dimensión Cronenberg", "Dimensión loca e irascible.", 'Activa', 5);
    const Tierra = new Location('C-000', "Tierra", "Planeta de origen de los humanos", 'Planeta', dimension, 48932489124);
    const humanSpecies = new Species("C-001", "Human", "Especies común en todas las dimensiones", Tierra, "Humanoide", 80);
    expect(humanSpecies).toBeInstanceOf(Species);
    expect(humanSpecies.id).toBe("C-001");
    expect(humanSpecies.name).toBe("Human");
    expect(humanSpecies.description).toBe("Especies común en todas las dimensiones");
    expect(humanSpecies.originLocation).toBe(Tierra);
    expect(humanSpecies.type).toBe("Humanoide");
    expect(humanSpecies.averageLifespan).toBe(80);
  })

  test('averageLifespan no puede ser negativo', () => {
    expect(() => new Species("C-002", 'Wookie', 'Muy fuertes', location, 'Humanoide', -100)).toThrowError("El tiempo de vida medio no puede ser negativo")  
  })

  test('originLocation no puede ser nula', () => {
    // @ts-expect-error
    expect(() => new Species("C-003", 'Droid', 'Seres mecánicos', null, 'Robot', 50)).toThrowError("La ubicación de origen no puede ser nula")  
  })

  test('Se puede cambiar type', () => {
    const dimension = new Dimension('C-124', "Dimensión Cronenberg", "Dimensión loca e irascible.", 'Activa', 5);
    const Tierra = new Location('C-000', "Tierra", "Planeta de origen de los humanos", 'Planeta', dimension, 48932489124);
    const humanSpecies = new Species("C-001", "Human", "Especies común en todas las dimensiones", Tierra, "Humanoide", 80);
    humanSpecies.type = 'Parásito'
    expect(humanSpecies.type).toBe('Parásito');
  })

  test('Se puede cambiar averageLifespan', () => {
    const dimension = new Dimension('C-124', "Dimensión Cronenberg", "Dimensión loca e irascible.", 'Activa', 5);
    const Tierra = new Location('C-000', "Tierra", "Planeta de origen de los humanos", 'Planeta', dimension, 48932489124);
    const humanSpecies = new Species("C-001", "Human", "Especies común en todas las dimensiones", Tierra, "Humanoide", 80);
    humanSpecies.averageLifespan = 90;
    expect(humanSpecies.averageLifespan).toBe(90);
  })
  
  test('No se puede cambiar originLocation', () => {
    const dimension = new Dimension('C-124', "Dimensión Cronenberg", "Dimensión loca e irascible.", 'Activa', 5);
    const Tierra = new Location('C-000', "Tierra", "Planeta de origen de los humanos", 'Planeta', dimension, 48932489124);
    const humanSpecies = new Species("C-001", "Human", "Especies común en todas las dimensiones", Tierra, "Humanoide", 80);
    // @ts-expect-error
    expect(() => humanSpecies.originLocation = new Location('C-001', "Marte", "Planeta rojo", 'Planeta', dimension, 0)).toThrowError()
  })
})