import { describe, test, expect, vi } from 'vitest';
import { ItemCRUD } from '../src/classes/crud/itemCRUD';
import { Item } from '../src/classes/item';
import { Character } from '../src/classes/character';
import { Species } from '../src/classes/species';
import { Location } from '../src/classes/location';
import { Dimension } from '../src/classes/dimension';
import { database } from '../src/db/db';

vi.spyOn(database, 'write').mockImplementation(async () => {});

describe('ItemCRUD function tests', () => {
  const crud = new ItemCRUD();
  const dim = new Dimension('D-2423I', 'Dim', 'Desc', 'Activa', 5);
  const loc = new Location('L-ITM-TEST', 'Tierra', 'Planeta', 'Planeta', dim, 100);
  const spc = new Species('S-ITM-TEST', 'Humano', 'Desc', loc, 'Humanoide', 80);
  const char = new Character('C-ITM-TEST', 'Inventor', 'Desc', spc, dim, 'Vivo', 'Independiente', 10);
  
  const testItem = new Item('I-TEST-99', 'Rayo Láser', 'Peligroso', char, 'Arma', 9);

  test('add() añade el invento', async () => {
    await crud.add(testItem);
    expect(crud.read('I-TEST-99')).toBeDefined();
  });

  test('add() lanza error si ya existe', async () => {
    await expect(crud.add(testItem)).rejects.toThrowError('El invento con id I-TEST-99 ya existe.');
  });

  test('update() modifica los datos', async () => {
    const itemMod = new Item('I-TEST-99', 'Rayo Congelante', 'Frio', char, 'Arma', 4);
    await crud.update('I-TEST-99', itemMod);
    expect(crud.read('I-TEST-99')?.name).toBe('Rayo Congelante');
  });

  test('delete() elimina el invento', async () => {
    await crud.delete('I-TEST-99');
    expect(crud.read('I-TEST-99')).toBeUndefined();
  });
});