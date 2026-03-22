import { describe, test, expect } from 'vitest';
import { NeutralizationEvent } from '../src/classes/neutralizationEvent';

describe('NeutralizationEvent function tests', () => {
  test('Instancia y genera descripción correcta', () => {
    const neutralizacion = new NeutralizationEvent('I-01', 'L-01');
    
    expect(neutralizacion).toBeInstanceOf(NeutralizationEvent);
    
    const descripcion = neutralizacion.createDescription();
    expect(descripcion).toContain('Neutralización del artefacto Pistola de portales');
    expect(descripcion).toContain('Tierra (C-137)');
  });
});