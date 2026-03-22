import { TypeOfEvent } from '../interfaces/typeOfEvent.js';
import { database } from "../db/db.js";

/**
 * Clase que representa un evento de neutralización de un artefacto en una localización específica.
 */
export class NeutralizationEvent implements TypeOfEvent {

  /**
   * Constructor de la clase NeutralizationEvent.
   * @param itemId - El ID del artefacto que se neutraliza.
   * @param locationId - El ID de la localización donde se neutraliza el artefacto.
   */
  constructor(public readonly itemId: string, public readonly locationId: string) {}

  /**
   * Crea una descripción del evento de neutralización, incluyendo el nombre del artefacto y la localización.
   * @returns Una cadena de texto que describe el evento de neutralización.
    * @throws Error si no se encuentra el artefacto o la localización en la base de datos.
   */
  createDescription(): string {
    const item = database.data.inventos.find(item => {
      const itemId = (item as any)._id;
      return itemId === this.itemId;
    });
    const location = database.data.localizaciones.find(loc => {
      const locId = (loc as any)._id;
      return locId === this.locationId;
    });
    if (!item) {
      throw new Error(`Evento fallido. No se encontró el objeto con ID ${this.itemId}.`);
    }
    if (!location) {
      throw new Error(`Evento fallido. No se encontró la localización con ID ${this.locationId}.`);
    }
    const event = `Neutralización del artefacto ${(item as any)._name} en la localización ${(location as any)._name}`;
    return event;
  }
}