import { describe, test, expect } from 'vitest'
import { Character } from '../src/classes/character'
import { Dimension } from '../src/classes/dimension'

let dimension: Dimension = new Dimension('1', "Dimensión Cronenberg", 'Activa', 5, "Dimensión loca e irascible.")
let vader: Character = new Character('Personaje1', 'Vader', 'Humano', dimension, 'Robot-sustituto', 'Federación Galáctica', 8, 'Era el elegido')
// ID único.
// Nombre. (Ejemplo: Rick Sanchez, Morty Smith, Evil Morty, Pickle Rick).
// Especie. Referencia a la especie a la que pertenece el personaje (véase la sección Especies).
// Dimensión de origen. Referencia a la dimensión de la que procede.
// Estado. (Ejemplo: Vivo, Muerto, Desconocido, Robot-sustituto).
// Afiliación. (Ejemplo: Federación Galáctica, Consejo de Ricks, Familia Smith, Independiente).
// Nivel de inteligencia. Escala del 1 al 10.
// Descripción. Breve biografía o notas relevantes sobre el personaje.

describe('Character function test', () => {
  test('vader is instance ofCharacter', () => {
    expect(vader).toBeInstanceOf(Character)
  })

  test('vader initializes correctly', () => {
    expect(vader.id).toEqual('Personaje1')
    expect(vader.name).toEqual('Vader')
    expect(vader.specie).toEqual('Humano')
    expect(vader.dimension).toEqual(dimension)
    expect(vader.state).toEqual('Robot-sustituto')
    expect(vader.affiliation).toEqual('Federación Galáctica')
    expect(vader.intelligence).toEqual(8)
    expect(vader.desc).toEqual('Era el elegido')
  })
  
})