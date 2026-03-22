import { describe, test, expect } from 'vitest';
import { DeployEvent } from '../src/classes/deployEvent';

describe('DeployEvent function tests', () => {
  test('Instancia correcta de DeployEvent', () => {
    const despliegue = new DeployEvent('I-45', 'L-01');
    
    expect(despliegue).toBeInstanceOf(DeployEvent);
    expect(despliegue.itemId).toBe('I-45');
    expect(despliegue.locationId).toBe('L-01');
  });

  test('createDescription arroja error si no existe el invento', () => {
    const despliegue = new DeployEvent('I-INVALIDO', 'L-01');
    expect(() => despliegue.createDescription()).toThrowError(/Evento fallido/);
  });
});