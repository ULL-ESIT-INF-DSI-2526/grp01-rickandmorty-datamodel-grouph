import { TypeOfEvent } from '../interfaces/typeOfEvent.js';
import { database } from "../db/db.js";

/**
 * Clase que representa un evento de creación de una dimensión. Implementa la interfaz TypeOfEvent.
 */
export class CreateEvent implements TypeOfEvent {

  /**
   * Constructor de la clase CreateEvent.
   * @param dimensionId - El ID de la dimensión que se ha creado.
   * @param paradox - La paradoja que ha causado la creación de la dimensión.
   */
  constructor(private dimensionId: string, private paradox: string) {}

  /**
   * Genera una descripción del evento de creación de la dimensión.
   * @returns Una cadena de texto que describe el evento.
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
    const event = `Creación de la dimension ${(dimension as any)._id}, como consecuencia de ${this.paradox}`;
    return event;
  }
}