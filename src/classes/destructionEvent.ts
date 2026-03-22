import { TypeOfEvent } from '../interfaces/typeOfEvent.js';
import { database } from "../db/db.js";

/**
 * Clase que representa un evento de destrucción de una dimensión. Implementa la interfaz TypeOfEvent.
 */
export class DestructionEvent implements TypeOfEvent {

  /**
   * Constructor de la clase DestructionEvent.
   * @param dimensionId - El ID de la dimensión que se va a destruir.
   * @param paradox - La paradoja que causó la destrucción de la dimensión.
   */
  constructor(public readonly dimensionId: string, public readonly paradox: string) {}

  /**
   * Crea una descripción del evento de destrucción de la dimensión. 
   * @returns Una cadena de texto que describe el evento de destrucción de la dimensión.
   * @throws Error si no se encuentra la dimensión con el ID proporcionado.
   */
  createDescription(): string {
    const dimension = database.data.dimensiones.find(dim => {
      const dimId = (dim as any)._id;
      return dimId === this.dimensionId;
    });
    if (!dimension) {
      throw new Error(`Evento fallido. No se encontró la dimensión con ID ${this.dimensionId}.`);
    }
    const event = `Destrucción de la dimension ${(dimension as any)._id}, como consecuencia de ${this.paradox}`;
    return event;
  }
}