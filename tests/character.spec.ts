import { describe, test, expect } from 'vitest'
import { Character } from '../src/classes/character'
import { Specie } from '../src/classes/species'
import { Dimension } from '../src/classes/dimension'
import { Location } from '../src/classes/location'

const dimension = new Dimension('C-137', 'Dimension Canonica', 'Dimensión original de Rick y Morty', 'Activa', 5)
const humano: Specie = new Specie('idhumano', 'Humano', 'Especie común en la Tierra', new Location('idlocation', 'Tierra', 'Planeta natal de los humanos', 'Planeta', dimension, 8000000000), 'Humanoide', 80)
const vader: Character = new Character('Personaje1', 'Vader', 'Era el elegido', humano, dimension, 'Robot-sustituto', 'Federación Galáctica', 8)

describe('Character function test', () => {
  test('vader is instance ofCharacter', () => {
    expect(vader).toBeInstanceOf(Character)
  })

  test('vader initializes correctly', () => {
    expect(vader.id).toEqual('Personaje1')
    expect(vader.name).toEqual('Vader')
    expect(vader.specie).toEqual(humano)
    expect(vader.dimension).toEqual(dimension)
    expect(vader.state).toEqual('Robot-sustituto')
    expect(vader.affiliation).toEqual('Federación Galáctica')
    expect(vader.intelligence).toEqual(8)
    expect(vader.description).toEqual('Era el elegido')
  })

  test('vader throws error with invalid parameters', () => {
    expect(() => new Character('Personaje2', 'Luke', 'Es un Jedi', humano, dimension, 'Vivo', 'Familia Smith', 11)).toThrowError('Intelligence debe estar en el rango 1-10')
  })

  test('vader state can be updated', () => {
    vader.state = 'Vivo'
    expect(vader.state).toEqual('Vivo')
  })

  test('vader affiliation can be updated', () => {
    vader.affiliation = 'Familia Smith'
    expect(vader.affiliation).toEqual('Familia Smith')
  })

  test('vader intelligence can be updated', () => {
    vader.intelligence = 9
    expect(vader.intelligence).toEqual(9)
  })

  test('vader specie and dimension cannot be updated', () => {
    expect(() => vader.specie = humano).toThrowError()
    expect(() => vader.dimension = dimension).toThrowError()
  })

  test('vader id and name cannot be updated', () => {
    expect(() => vader.id = 'Personaje4').toThrowError()
    expect(() => vader.name = 'Anakin').toThrowError()
  })

  test('vader intelligence cannot be set to invalid value', () => {
    expect(() => vader.intelligence = 0).toThrowError('Intelligence debe estar en el rango 1-10')
    expect(() => vader.intelligence = 11).toThrowError('Intelligence debe estar en el rango 1-10')
  })

})