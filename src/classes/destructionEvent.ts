import { TypeOfEvent } from '../interfaces/typeOfEvent.js';
import { database } from "../db/db.js";

export class DestructionEvent implements TypeOfEvent {

  constructor(private dimensionId: string, private paradox: string) {}

  createDescription(): string {
    const dimension = database.data.dimensiones.find(dim => dim.id === this.dimensionId);
    if (!dimension) {
      throw new Error(`Evento fallido. No se encontró la dimensión con ID ${this.dimensionId}.`);
    }
    const event = `Destrucción de la ${dimension.name}, como consecuencia de ${this.paradox}`;
    return event;
  }
}