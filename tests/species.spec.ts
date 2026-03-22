import { describe, test, expect} from "vitest";
import { Species } from "../src/classes/species.js";
import { Location } from "../src/classes/location.js";
import { Dimension } from "../src/classes/dimension.js";

const dimension = new Dimension('C-124', "Dimensión Cronenberg", "Dimensión loca e irascible.", 'Activa', 5)
const Tierra = new Location('L-000', "Tierra", "Planeta de origen de los humanos", 'Planeta', dimension, 48932489124)

describe("Tests para la clase Species", () => {
  test('Objeto Species se crea correctamente', () => {
    const humanSpecies = new Species("S-001", "Human", "Especie común", Tierra, "Humanoide", 80);
    expect(humanSpecies).toBeInstanceOf(Species);
    expect(humanSpecies.id).toBe("S-001");
    expect(humanSpecies.name).toBe("Human");
    expect(humanSpecies.description).toBe("Especie común");
    expect(humanSpecies.originLocation).toBe(Tierra);
    expect(humanSpecies.type).toBe("Humanoide");
    expect(humanSpecies.averageLifespan).toBe(80);
  })

  test('averageLifespan no puede ser negativo', () => {
    expect(() => new Species("S-002", 'Wookie', 'Muy fuertes', Tierra, 'Humanoide', -100)).toThrowError("El tiempo de vida medio no puede ser negativo")  
  })

  test('originLocation no puede ser nula', () => {
    // @ts-expect-error
    expect(() => new Species("S-003", 'Droid', 'Seres mecánicos', null, 'Robot', 50)).toThrowError("La ubicación de origen no puede ser nula")  
  })

  test('Se pueden actualizar atributos permitidos (type y lifespan)', () => {
    const humanSpecies = new Species("S-001", "Human", "Especie común", Tierra, "Humanoide", 80);
    humanSpecies.type = 'Parásito';
    humanSpecies.averageLifespan = 90;
    
    expect(humanSpecies.type).toBe('Parásito');
    expect(humanSpecies.averageLifespan).toBe(90);
  })
  
  test('Atributos de solo lectura no se pueden reasignar', () => {
    const humanSpecies = new Species("S-001", "Human", "Especie común", Tierra, "Humanoide", 80);
    // @ts-expect-error
    expect(() => humanSpecies.originLocation = new Location('L-001', "Marte", "Planeta rojo", 'Planeta', dimension, 0)).toThrowError()
    // @ts-expect-error
    expect(() => humanSpecies.id = "S-002").toThrowError()
  })
})