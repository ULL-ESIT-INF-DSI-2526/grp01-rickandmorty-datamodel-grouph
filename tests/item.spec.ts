import { describe, test, expect } from 'vitest'
import { Character } from '../src/classes/character.js'
import { Item } from '../src/classes/item.js'
import { Species } from '../src/classes/species.js'
import { Dimension } from '../src/classes/dimension.js'
import { Location } from '../src/classes/location.js'

const dimension = new Dimension('C-137', 'Dimension Canonica', 'Dimensión original', 'Activa', 5)
const humano: Species = new Species('S-01', 'Humano', 'Especie común', new Location('L-01', 'Tierra', 'Planeta natal', 'Planeta', dimension, 8000000000), 'Humanoide', 80)
const rick: Character = new Character('C-01', 'Rick', 'Científico loco', humano, dimension, 'Vivo', 'Independiente', 10)

describe("Pruebas de Item", () => {
  test("Creación del objeto", () => {
    expect(new Item('I-01', "Sable laser","Haz de luz rojo", rick, 'Arma', 10)).toBeInstanceOf(Item) 
  })

  test("Initialization of Item", () => {
    const item = new Item('I-01', "Sable laser", "Haz de luz rojo", rick, 'Arma', 10)
    expect(item.id).toEqual('I-01')
    expect(item.name).toEqual("Sable laser")
    expect(item.description).toEqual("Haz de luz rojo")
    expect(item.inventor).toEqual(rick)
    expect(item.type).toEqual('Arma')
    expect(item.danger).toEqual(10)
  })

  test("Invalid danger value throws error", () => {
    expect(() => new Item('I-02', "Pistola", 'Piu Piu', rick, 'Arma', -1)).toThrowError('Danger debe estar en el rango 0-10')
    expect(() => new Item('I-02', "Pistola", 'Piu Piu', rick, 'Arma', 11)).toThrowError('Danger debe estar en el rango 0-10')
  })

  test("Updating mutable properties", () => {
    const item = new Item('I-01', "Sable laser", 'Haz de luz rojo', rick, 'Arma', 10)
    item.type = 'Biotecnología'
    item.danger = 8
    
    expect(item.type).toEqual('Biotecnología')
    expect(item.danger).toEqual(8)
  })

  test("Read-only properties throw error on assignment", () => {
    const item = new Item('I-01', "Sable laser", 'Haz de luz', rick, 'Arma', 10)
    
     // @ts-expect-error
    expect(() => item.inventor = new Character('C-02', 'Otro Inventor', 'Genio', humano, dimension, 'Vivo', 'Independiente', 9)).toThrowError()
    // @ts-expect-error
    expect(() => item.id = "I-99").toThrowError()
  })
})