import { describe, test, expect, vi } from 'vitest';
import { CharacterCRUD } from '../src/classes/crud/characterCrud';
import { Character } from '../src/classes/character';
import { Species } from '../src/classes/species';
import { Location } from '../src/classes/location';
import { Dimension } from '../src/classes/dimension';
import { database } from '../src/db/db';

vi.spyOn(database, 'write').mockImplementation(async () => {});

describe('CharacterCRUD function tests', () => {
  const crud = new CharacterCRUD();
  const dim = new Dimension('J-324', 'Dim', 'Desc', 'Activa', 5);
  const loc = new Location('L-CHAR-TEST', 'Tierra', 'Planeta', 'Planeta', dim, 100);
  const spc = new Species('S-CHAR-TEST', 'Humano', 'Desc', loc, 'Humanoide', 80);
  
  const testChar = new Character('C-TEST-99', 'Sujeto Prueba', 'Desc', spc, dim, 'Vivo', 'Independiente', 5);

  test('add() añade el personaje', async () => {
    await crud.add(testChar);
    expect(crud.read('C-TEST-99')).toBeDefined();
  });

  test('add() lanza error si ya existe', async () => {
    await expect(crud.add(testChar)).rejects.toThrowError('El personaje con id C-TEST-99 ya existe.');
  });

  test('update() modifica los datos', async () => {
    const charMod = new Character('C-TEST-99', 'Sujeto Mod', 'Mod', spc, dim, 'Muerto', 'Federación Galáctica', 10);
    await crud.update('C-TEST-99', charMod);
    expect(crud.read('C-TEST-99')?.name).toBe('Sujeto Mod');
  });

  test('delete() elimina el personaje', async () => {
    await crud.delete('C-TEST-99');
    expect(crud.read('C-TEST-99')).toBeUndefined();
  });
});