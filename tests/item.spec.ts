import { describe, test, expect } from 'vitest'
import { Character } from '../src/classes/character.js'
import { Item } from '../src/classes/item.js'
import { Species } from '../src/classes/species.js'
import { Dimension } from '../src/classes/dimension.js'
import { Location } from '../src/classes/location.js'


const dimension = new Dimension('C-137', 'Dimension Canonica', 'Dimensión original de Rick y Morty', 'Activa', 5)
const humano: Species = new Species('idhumano', 'Humano', 'Especie común en la Tierra', new Location('idlocation', 'Tierra', 'Planeta natal de los humanos', 'Planeta', dimension, 8000000000), 'Humanoide', 80)
const vader: Character = new Character('Personaje1', 'Vader', 'Era el elegido', humano, dimension, 'Robot-sustituto', 'Federación Galáctica', 8)

describe("Pruebas de Item", () => {
  test("Creación del objeto", () => {
    expect(new Item('1', "Sable laser","Haz de luz rojo", vader, 'Arma', 10)).toBeInstanceOf(Item) 
  })

  test("Initialization of Item", () => {
    const item = new Item('1', "Sable laser", "Haz de luz rojo", vader, 'Arma', 10, )
    expect(item.id).toEqual('1')
    expect(item.name).toEqual("Sable laser")
    expect(item.description).toEqual("Haz de luz rojo")
    expect(item.type).toEqual('Arma')
    expect(item.danger).toEqual(10)
  })

  test("Invalid danger value", () => {
    expect(() => new Item('1', "Sable laser", 'Haz de luz rojo', vader, 'Arma', -1)).toThrowError('Danger debe estar en el rango 0-10')
    expect(() => new Item('1', "Sable laser", 'Haz de luz rojo', vader, 'Arma', 11)).toThrowError('Danger debe estar en el rango 0-10')
  })

  test("Updating type and power", () => {
    const item = new Item('1', "Sable laser", 'Haz de luz rojo', vader, 'Arma', 10)
    item.type = 'Biotecnología'
    item.danger = 8
    expect(item.type).toEqual('Biotecnología')
    expect(item.danger).toEqual(8)
  })

  test("Inventor is read-only", () => {
    const inventor = new Character('1', 'Inventor', 'Un gran inventor', humano, dimension, 'Vivo', 'Federación Galáctica', 10)
    const item = new Item('1', "Sable laser", 'Haz de luz rojo', inventor, 'Arma', 10)
    expect(item.inventor).toEqual(inventor)
     // @ts-expect-error
    expect(() => item.inventor = new Character('2', 'Otro Inventor', 'Otro gran inventor', humano, dimension, 'Vivo', 'Federación Galáctica', 10)).toThrowError()
  })
})