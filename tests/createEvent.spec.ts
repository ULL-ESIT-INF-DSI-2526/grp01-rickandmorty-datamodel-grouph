import { describe, test, expect } from 'vitest';
import { CreateEvent } from '../src/classes/createEvent';

describe('CreateEvent function tests', () => {
  test('Instancia correcta de CreateEvent', () => {
    const creacion = new CreateEvent('D-999', 'Paradoja del Abuelo');
    
    expect(creacion).toBeInstanceOf(CreateEvent);
    expect((creacion as any).dimensionId).toBe('D-999');
    expect((creacion as any).paradox).toBe('Paradoja del Abuelo');
  });

  test('createDescription arroja error si la dimensión no existe', () => {
    const creacion = new CreateEvent('D-404', 'Error');
    expect(() => creacion.createDescription()).toThrowError(/Evento fallido/);
  });
});