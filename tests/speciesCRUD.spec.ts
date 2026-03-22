import { describe, test, expect, vi } from 'vitest';
import { SpeciesCRUD } from '../src/classes/crud/speciesCRUD';
import { Species } from '../src/classes/species';
import { Location } from '../src/classes/location';
import { Dimension } from '../src/classes/dimension';
import { database } from '../src/db/db';

vi.spyOn(database, 'write').mockImplementation(async () => {});

describe('SpeciesCRUD function tests', () => {
  const crud = new SpeciesCRUD();
  const dim = new Dimension('L-123S', 'Dim', 'Desc', 'Activa', 5);
  const loc = new Location('L-SPC-TEST', 'Tierra', 'Planeta', 'Planeta', dim, 100);
  const testSpecies = new Species('S-TEST-99', 'Alien Test', 'Raza de prueba', loc, 'Humanoide', 100);

  test('add() añade la especie', async () => {
    await crud.add(testSpecies);
    expect(crud.read('S-TEST-99')).toBeDefined();
  });

  test('add() lanza error si ya existe', async () => {
    await expect(crud.add(testSpecies)).rejects.toThrowError('La especie con id S-TEST-99 ya existe.');
  });

  test('update() modifica los datos', async () => {
    const specMod = new Species('S-TEST-99', 'Alien Mod', 'Modificado', loc, 'Parásito', 200);
    await crud.update('S-TEST-99', specMod);
    expect(crud.read('S-TEST-99')?.name).toBe('Alien Mod');
  });

  test('delete() elimina la especie', async () => {
    await crud.delete('S-TEST-99');
    expect(crud.read('S-TEST-99')).toBeUndefined();
  });
});