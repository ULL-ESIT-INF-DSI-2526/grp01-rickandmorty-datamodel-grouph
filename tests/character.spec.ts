import { describe, test, expect } from 'vitest'
import { Character } from '../src/classes/character'
import { Species } from '../src/classes/species'
import { Dimension } from '../src/classes/dimension'
import { Location } from '../src/classes/location'

const dimension = new Dimension('C-137', 'Dimension Canonica', 'Dimensión original', 'Activa', 5)
const humano: Species = new Species('S-01', 'Humano', 'Especie común', new Location('L-01', 'Tierra', 'Planeta natal', 'Planeta', dimension, 8000000000), 'Humanoide', 80)
const vader: Character = new Character('C-01', 'Vader', 'Era el elegido', humano, dimension, 'Robot-sustituto', 'Federación Galáctica', 8)

describe('Character function test', () => {
  test('vader is instance of Character', () => {
    expect(vader).toBeInstanceOf(Character)
  })

  test('vader initializes correctly', () => {
    expect(vader.id).toEqual('C-01')
    expect(vader.name).toEqual('Vader')
    expect(vader.species).toEqual(humano) 
    expect(vader.dimension).toEqual(dimension)
    expect(vader.state).toEqual('Robot-sustituto')
    expect(vader.affiliation).toEqual('Federación Galáctica')
    expect(vader.intelligence).toEqual(8)
    expect(vader.description).toEqual('Era el elegido')
  })

  test('Throws error with invalid intelligence parameters', () => {
    expect(() => new Character('C-02', 'Luke', 'Es un Jedi', humano, dimension, 'Vivo', 'Familia Smith', 11)).toThrowError('Intelligence debe estar en el rango 1-10')
    expect(() => new Character('C-02', 'Luke', 'Es un Jedi', humano, dimension, 'Vivo', 'Familia Smith', 0)).toThrowError('Intelligence debe estar en el rango 1-10')
  })

  test('Mutable properties can be updated', () => {
    vader.state = 'Vivo'
    vader.affiliation = 'Familia Smith'
    vader.intelligence = 9
    
    expect(vader.state).toEqual('Vivo')
    expect(vader.affiliation).toEqual('Familia Smith')
    expect(vader.intelligence).toEqual(9)
  })

  test('Readonly properties cannot be updated', () => {
    // @ts-expect-error
    expect(() => vader.species = humano).toThrowError()
    // @ts-expect-error
    expect(() => vader.dimension = dimension).toThrowError()
    // @ts-expect-error
    expect(() => vader.id = 'C-04').toThrowError()
    // @ts-expect-error
    expect(() => vader.name = 'Anakin').toThrowError()
  })

  test('Intelligence setter respects limits', () => {
    expect(() => vader.intelligence = 0).toThrowError('Intelligence debe estar en el rango 1-10')
    expect(() => vader.intelligence = 11).toThrowError('Intelligence debe estar en el rango 1-10')
  })
})