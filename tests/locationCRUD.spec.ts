import { describe, test, expect, vi } from 'vitest';
import { LocationCRUD } from '../src/classes/crud/locationCRUD';
import { Location } from '../src/classes/location';
import { Dimension } from '../src/classes/dimension';
import { database } from '../src/db/db';

vi.spyOn(database, 'write').mockImplementation(async () => {});

describe('LocationCRUD function tests', () => {
  const crud = new LocationCRUD();
  const dim = new Dimension('D-124L', 'Dim', 'Desc', 'Activa', 5);
  const testLoc = new Location('L-TEST-99', 'Tierra 2', 'Planeta clon', 'Planeta', dim, 100);

  test('add() añade la localización', async () => {
    await crud.add(testLoc);
    expect(crud.read('L-TEST-99')).toBeDefined();
  });

  test('add() lanza error si ya existe', async () => {
    await expect(crud.add(testLoc)).rejects.toThrowError('La localización con id L-TEST-99 ya existe.');
  });

  test('update() modifica los datos', async () => {
    const locMod = new Location('L-TEST-99', 'Marte 2', 'Planeta rojo', 'Planeta', dim, 50);
    await crud.update('L-TEST-99', locMod);
    expect(crud.read('L-TEST-99')?.name).toBe('Marte 2');
  });

  test('delete() elimina la localización', async () => {
    await crud.delete('L-TEST-99');
    expect(crud.read('L-TEST-99')).toBeUndefined();
  });
});