import { describe, test, expect } from 'vitest';
import { TravelEvent } from '../src/classes/travelEvent';

describe('TravelEvent function tests', () => {
  test('Instancia correcta de TravelEvent', () => {
    // Usamos una fecha en el pasado para que sea válida
    const fecha = new Date('2020-05-04');
    const viaje = new TravelEvent('C-01', 'C-137', fecha, 'Huir de la Federación');
    
    expect(viaje).toBeInstanceOf(TravelEvent);
    // Usamos "as any" porque los atributos son privados y no tienen getters
    expect((viaje as any).characterid).toBe('C-01');
    expect((viaje as any).destinationDimensionId).toBe('C-137');
    expect((viaje as any).date).toBe(fecha);
    expect((viaje as any).reason).toBe('Huir de la Federación');
  });

  test('Arroja error si la fecha es en el futuro', () => {
    const fechaFutura = new Date('2050-01-01');
    const viaje = new TravelEvent('C-01', 'C-137', fechaFutura, 'Viaje temporal');
    // Al intentar crear la descripción con una fecha futura, debe fallar
    expect(() => viaje.createDescription()).toThrowError('Evento fallido. Fecha no válida');
  });

  test('createDescription arroja error si no existe el personaje o dimensión en BD', () => {
    const viaje = new TravelEvent('C-INVALIDO', 'C-137', new Date('2020-01-01'), 'Motivo');
    // Como el entorno de test no tiene a "C-INVALIDO" cargado, debe saltar la protección
    expect(() => viaje.createDescription()).toThrowError(/Evento fallido/);
  });
});
