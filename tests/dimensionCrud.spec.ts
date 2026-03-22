import { describe, test, expect, vi } from 'vitest';
import { DimensionCRUD } from '../src/classes/crud/dimensionCrud';
import { Dimension } from '../src/classes/dimension';
import { database } from '../src/db/db';

vi.spyOn(database, 'write').mockImplementation(async () => {});

describe('DimensionCRUD function tests', () => {
  const crud = new DimensionCRUD();
  const testDim = new Dimension('C-132', 'Dimensión Prueba', 'Para testing', 'Activa', 5);

  test('add() añade la dimensión a la base de datos', async () => {
    await crud.add(testDim);
    expect(crud.read('C-132')).toBeDefined();
  });

  test('add() lanza error si la dimensión ya existe', async () => {
    await expect(crud.add(testDim)).rejects.toThrowError('La dimensión ya existe.');
  });

  test('read() devuelve undefined si no encuentra el ID', () => {
    expect(crud.read('C-133')).toBeUndefined();
  });

  test('update() modifica los datos correctamente', async () => {
    const dimModificada = new Dimension('C-132', 'Dim Modificada', 'Test', 'Destruida', 10);
    await crud.update('C-132', dimModificada);
    
    const leida = crud.read('C-132');
    expect(leida?.name).toBe('Dim Modificada');
    expect(leida?.state).toBe('Destruida');
    expect(leida?.tecnologyLevel).toBe(10);
  });

  test('update() lanza error si la dimensión no existe', async () => {
    await expect(crud.update('C-133', testDim)).rejects.toThrowError('La dimensión con id C-133 no existe.');
  });

  test('delete() elimina la dimensión de la base de datos', async () => {
    await crud.delete('C-137');
    expect(crud.read('C-137')).toBeUndefined();
  });

  test('delete() lanza error si la dimensión no existe', async () => {
    await expect(crud.delete('C-133')).rejects.toThrowError('La dimensión con id C-133 no existe.');
  });
});