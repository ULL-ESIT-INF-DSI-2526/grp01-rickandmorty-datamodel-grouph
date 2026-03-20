import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { Character } from '../src/classes/character.js'
import { Species } from '../src/classes/species.js'
import { Dimension } from '../src/classes/dimension.js'
import { Location } from '../src/classes/location.js'
import { CharacterCRUD } from '../src/classes/crud/characterCrud.js'
import { DBMultiverso } from '../src/db/db.js'

vi.mock('../src/db/db.js', () => {
  const defaultData: DBMultiverso = {
    personajes: [],
    dimensiones: [],
    especies: [],
    localizaciones: [],
    inventos: []
  }

  return defaultData
});

describe("CharacterCRUD class tests", () => {
  let characterCRUD: CharacterCRUD;

  beforeEach(() => {
    characterCRUD = new CharacterCRUD();
  });
})