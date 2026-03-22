import { describe, test, expect, vi } from 'vitest';
import { EventClass } from '../src/classes/event';
import { TypeOfEvent } from '../src/interfaces/typeOfEvent';

describe('Pruebas de la clase EventClass', () => {
  
  const mockTypeOfEvent: TypeOfEvent = {
    createDescription: vi.fn().mockReturnValue('Descripción generada por el mock')
  };

  test('Se instancia correctamente y se asigna el typeOfEvent inicial', () => {
    const evento = new EventClass(mockTypeOfEvent);
    
    expect(evento).toBeInstanceOf(EventClass);
    expect(evento.typeOfEvent).toBe(mockTypeOfEvent);
    expect(evento.description).toBeUndefined(); 
  });

  test('Los métodos Setters y Getters funcionan correctamente', () => {
    const evento = new EventClass(mockTypeOfEvent);

    evento.description = 'Nueva descripción forzada manualmente';
    expect(evento.description).toBe('Nueva descripción forzada manualmente');

    const otroMockEvent: TypeOfEvent = {
      createDescription: vi.fn().mockReturnValue('Otra descripción distinta')
    };
    
    evento.setTypeOfEvent(otroMockEvent);
    expect(evento.typeOfEvent).toBe(otroMockEvent);
  });

  test('El método register() llama a createDescription() y actualiza la descripción del evento', () => {
    const evento = new EventClass(mockTypeOfEvent);

    evento.register();
    expect(mockTypeOfEvent.createDescription).toHaveBeenCalled();
    expect(evento.description).toBe('Descripción generada por el mock');
  });
});