import { describe, test, expect } from 'vitest';
import { DestructionEvent } from '../src/classes/destructionEvent';

describe('DestructionEvent function tests', () => {
  test('Instancia correcta de DestructionEvent', () => {
    const destruction = new DestructionEvent('C-137', 'Invasión de Cronenbergs');
    
    expect(destruction).toBeInstanceOf(DestructionEvent);
    expect((destruction as any).dimensionId).toBe('C-137');
    expect((destruction as any).paradox).toBe('Invasión de Cronenbergs');
  });

  test('createDescription arroja error si la dimensión no existe', () => {
    const destruction = new DestructionEvent('D-404', 'Error');
    expect(() => destruction.createDescription()).toThrowError(/Evento fallido/);
  });
});