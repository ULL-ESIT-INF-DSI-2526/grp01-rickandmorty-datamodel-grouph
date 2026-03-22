import { TypeOfEvent } from '../interfaces/typeOfEvent.js';
import { database } from "../db/db.js";

/**
 * Clase que representa un evento de viaje de un personaje a una dimensión.
 */
export class TravelEvent implements TypeOfEvent {

  /**
   * Constructor de la clase TravelEvent.
   * @param characterid - ID del personaje que realiza el viaje.
   * @param destinationDimensionId - ID de la dimensión a la que se viaja.
   * @param date - Fecha del viaje.
   * @param reason - Motivo del viaje.
   */
  constructor(private characterid: string, private destinationDimensionId: string, private date: Date, private reason: string) {}

  /**
   * Crea una descripción del evento de viaje, incluyendo el nombre del personaje, la dimensión de destino, el motivo del viaje y la fecha.
   * @returns Una cadena de texto que describe el evento de viaje.
   * @throws Error si no se encuentra el personaje o la dimensión, o si la fecha no es válida.
   */
  createDescription(): string {
    const character = database.data.personajes.find(pj => {
      const pjId = (pj as any)._id;
      return pjId === this.characterid;
    });
    const dimension = database.data.dimensiones.find(dim => {
      const dimId = (dim as any)._id;
      return dimId === this.destinationDimensionId;
    });

    if (!character) {
      throw new Error(`Evento fallido. No se encontró el personaje con ID ${this.characterid}.`);
    }
    if (!dimension) {
      throw new Error(`Evento fallido. No se encontró la dimensión con ID ${this.destinationDimensionId}.`);
    }

    if (this.date > new Date()) {
      throw new Error("Evento fallido. Fecha no válida");
    }
    const event = `${(character as any)._name} viajó a la dimensión ${(dimension as any)._id}. Motivo del viaje: ${this.reason}. Fecha: ${this.date.toLocaleString()}.`;
    return event;
  }
}