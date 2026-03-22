import { TypeOfEvent } from '../interfaces/typeOfEvent.js';
import { database } from "../db/db.js";

export class CreateEvent implements TypeOfEvent {

  constructor(private dimensionId: string, private paradox: string) {}

  createDescription(): string {
    const dimension = database.data.dimensiones.find(dim => {
      const dimId = (dim as any)._id;
      return dimId === this.dimensionId;
    });
    if (!dimension) {
      throw new Error(`Evento fallido. No se encontró la dimensión con ID ${this.dimensionId}.`);
    }
    const event = `Creación de la ${dimension.name}, como consecuencia de ${this.paradox}`;
    return event;
  }
}